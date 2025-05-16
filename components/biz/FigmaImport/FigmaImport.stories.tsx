import type { Meta, StoryObj } from "@storybook/react"
import { FigmaImport } from "./index"
import { FigmaDesignData } from "./interface"

const meta: Meta<typeof FigmaImport> = {
  title: "业务组件/FigmaImport",
  component: FigmaImport,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FigmaImport>

export const Default: Story = {
  args: {
    onSubmit: (data: FigmaDesignData) => {
      console.log("Figma设计数据:", data)
    },
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    onSubmit: (data: FigmaDesignData) => {
      console.log("Figma设计数据:", data)
    },
    disabled: true,
  },
} 