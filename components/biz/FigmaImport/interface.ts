interface FigmaImportProps {
  onSubmit: (designData: FigmaDesignData) => void
  disabled?: boolean
}

interface FigmaDesignData {
  figmaUrl: string
  designContext?: any
  previewImage?: string
  apiKey?: string
  nodeId?: string
  nodeData?: any
}

export type { FigmaImportProps, FigmaDesignData } 