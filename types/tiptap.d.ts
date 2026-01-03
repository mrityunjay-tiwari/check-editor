import "@tiptap/core"

declare module "@tiptap/core" {
  interface EditorStorage {
    slashCommand: {
      active: boolean
      query: string
      range: { from: number; to: number } | null
    }
  }
}
