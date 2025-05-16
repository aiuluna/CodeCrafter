"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { AppHeader } from "@/components/biz/AppHeader"
import { ChatInput } from "@/components/biz/ChatInput"
import { CodegenGuide } from "@/components/biz/CodegenGuide"
import { ComponentCodeFilterContainer } from "@/components/biz/ComponentCodeFilterContainer"
import { ComponentCodeList } from "@/components/biz/ComponentCodeList"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import TldrawEdit from "@/components/biz/TldrawEdit/TldrawEdit"
import {
  useCodegenDetail,
  useComponentCodeList,
} from "../server-store/selectors"
import { useState } from "react"
import {
  useCreateComponentCode,
  useDeleteComponentCode,
} from "../server-store/mutations"
import { Prompt, PromptImage } from "@/lib/db/componentCode/types"
import { Skeleton } from "@/components/ui/skeleton"
import { CompoderThinkingLoading } from "@/components/biz/CompoderThinkingLoading"
import { useShowOnFirstData } from "@/hooks/use-show-on-first-data"
import { CodingBox } from "@/components/biz/CodingBox"
import {
  transformNewComponentIdFromXml,
  transformTryCatchErrorFromXml,
} from "@/lib/xml-message-parser/parser"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { AIProvider } from "@/lib/config/ai-providers"
import {
  LLMSelectorProvider,
  LLMSelectorButton,
} from "@/app/commons/LLMSelectorProvider"
import { Figma, X } from "lucide-react"
import { FigmaDesignData, FigmaImport } from "@/components/biz/FigmaImport"
import { FigmaDesign } from "@/app/api/ai-core/type"

export default function CodegenDetailPage({
  params,
}: {
  params: { codegenId: string }
}) {
  const { data: codegenDetail, isLoading } = useCodegenDetail(params.codegenId)
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filterField, setFilterField] = useState<
    "all" | "name" | "description"
  >("all")

  const { data: componentCodeData, isLoading: isComponentLoading } =
    useComponentCodeList({
      codegenId: params.codegenId,
      page: currentPage,
      pageSize: 10,
      searchKeyword,
      filterField,
    })

  const [chatValue, setChatValue] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const [provider, setProvider] = useState<AIProvider>()
  const [model, setModel] = useState<string>()
  const createComponentMutation = useCreateComponentCode()
  const deleteComponentMutation = useDeleteComponentCode()

  const shouldShowList = useShowOnFirstData(componentCodeData?.items)
  const [figmaDesign, setFigmaDesign] = useState<FigmaDesign | null>(null)

  // handle LLM change
  const handleLLMChange = (
    newProvider: AIProvider | undefined,
    newModel: string | undefined,
  ) => {
    console.log(`Selected LLM: ${newProvider} - ${newModel}`)
    setProvider(newProvider)
    setModel(newModel)
  }

  const handleChatSubmit = async () => {
    if (!chatValue.trim() && images.length === 0) return

    if (!model || !provider) {
      toast({
        title: "Error",
        description: "Please select a model and provider",
        variant: "default",
      })
      return
    }

    // let extraContext = ""

    // if (figmaDesign) {
    //   extraContext += `\n\nUser has provided a Figma design: ${figmaDesign.figmaUrl}\n`
    //   if (figmaDesign.previewImage) {
    //     extraContext += `Preview Image: ${figmaDesign.previewImage}\n`
    //   }
    //   if (figmaDesign.nodeId) {
    //     extraContext += `Node ID: ${figmaDesign.nodeId}\n`
    //   }
    //   if (figmaDesign.designContext) {
    //     extraContext += `Design context: ${JSON.stringify(figmaDesign.designContext)}\n`
    //   }
    //   if (figmaDesign.nodeData) {
    //     extraContext += `Node data: ${JSON.stringify(figmaDesign.nodeData)}\n`
    //   }
    // }
    // const finalPrompt = chatValue + extraContext


    setIsSubmitting(true)
    const prompts: Prompt[] = [
      ...images.map(
        image =>
        ({
          image,
          type: "image",
        } as PromptImage),
      ),
      {
        type: "text" as const,
        text: chatValue,
      },
    ]

    // if model is selected, add it to the request parameters
    const requestParams = {
      prompt: prompts,
      codegenId: params.codegenId,
      model,
      provider,
      figmaDesign: figmaDesign ? figmaDesign : undefined,
    }

    try {
      const res = await createComponentMutation.mutateAsync(requestParams)

      const reader = res?.getReader()
      const decoder = new TextDecoder()
      let content = ""

      while (true) {
        const { done, value } = await reader?.read()
        if (done) break
        content += decoder.decode(value)
        setStreamingContent(content)
      }

      const errorMessage = transformTryCatchErrorFromXml(content)
      if (errorMessage) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        return
      }

      const componentId = transformNewComponentIdFromXml(content)
      if (componentId) {
        router.push(`/main/codegen/${params.codegenId}/${componentId}`)
      }

      setChatValue("")
      setImages([])
    } catch (error) {
      console.error("Failed to create component:", error)
    } finally {
      setIsSubmitting(false)
      setStreamingContent("")
    }
  }

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleDeleteComponent = (id: string) => {
    deleteComponentMutation.mutate(
      { id },
      {
        onSuccess: () => {
          // Additional logic after successful deletion if needed
          console.log("Component deleted successfully:", id)
        },
      },
    )
  }

  const handleFigmaImport = (designData: FigmaDesignData) => {
    console.log("提交设计数据:", designData)
    setFigmaDesign(designData)

    toast({
      title: "Figma设计已添加",
      description: "Figma设计已添加到消息上下文中"
    })
  }

  const handleFigmaRemove = () => {
    setFigmaDesign(null)
  }


  return (
    <LLMSelectorProvider onChange={handleLLMChange}>
      <div>
        <AppHeader
          breadcrumbs={[
            { label: "Codegen", href: "/main/codegen" },
            { label: codegenDetail?.name || "Codegen Detail" },
          ]}
        />
        <ScrollArea className="h-[calc(100vh-88px)]">
          <div className="w-full max-w-4xl pt-12 pb-12 px-6 flex flex-col mx-auto">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : (
              <>
                <CodegenGuide
                  prompts={
                    codegenDetail?.prompts.map(prompt => ({
                      title: prompt.title,
                      onClick: () => {
                        setChatValue(prompt.title)
                      },
                    })) || []
                  }
                  name={codegenDetail?.name || ""}
                />

                <ChatInput
                  className="mt-6"
                  value={chatValue}
                  onChange={setChatValue}
                  onSubmit={handleChatSubmit}
                  actions={[
                    <TooltipProvider key="figma">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <FigmaImport onSubmit={handleFigmaImport} disabled={isSubmitting} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">导入Figma设计</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>,
                    <TooltipProvider key="draw-image">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <TldrawEdit
                              disabled={isSubmitting}
                              onSubmit={imageData => {
                                setImages(prev => [...prev, imageData])
                              }}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Draw An Image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>,
                    <LLMSelectorButton key="llm-selector" />,
                  ]}
                  images={images}
                  onImageRemove={handleImageRemove}
                  loading={isSubmitting}
                  extraContent={
                    figmaDesign && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Figma className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate max-w-[400px]">
                            {figmaDesign.figmaUrl}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleFigmaRemove}
                          className="h-6 w-6"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )
                  }
                  loadingSlot={
                    isSubmitting ? (
                      <CompoderThinkingLoading
                        text={
                          streamingContent
                            ? "Compoder is coding..."
                            : "Compoder is thinking..."
                        }
                      />
                    ) : undefined
                  }
                />
              </>
            )}
          </div>
          <div
            className={cn(
              isSubmitting || shouldShowList ? "opacity-100" : "opacity-0",
              "w-full mx-auto px-6",
            )}
          >
            <p className="text-lg font-bold mb-4">Component List</p>
            <ComponentCodeFilterContainer
              total={componentCodeData?.total || 0}
              currentPage={currentPage}
              searchKeyword={searchKeyword}
              filterField={filterField}
              onPageChange={setCurrentPage}
              onSearchChange={setSearchKeyword}
              onFilterFieldChange={setFilterField}
            >
              {isComponentLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : (
                <ComponentCodeList
                  newItem={
                    isSubmitting ? (
                      <CodingBox className="h-full" code={streamingContent} />
                    ) : undefined
                  }
                  items={componentCodeData?.items ?? []}
                  codeRendererServer={codegenDetail?.codeRendererUrl || ""}
                  // onEditClick={id => console.log("Edit clicked:", id)}
                  onDeleteClick={id => handleDeleteComponent(id)}
                  onItemClick={id =>
                    router.push(`/main/codegen/${params.codegenId}/${id}`)
                  }
                />
              )}
            </ComponentCodeFilterContainer>
          </div>
        </ScrollArea>
      </div>
    </LLMSelectorProvider>
  )
}
