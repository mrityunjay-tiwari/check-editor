import type { Editor } from "@tiptap/react"

export type CommandItem = {
  id: string
  title: string
  description?: string
  group?: string
  keywords?: string[]
  run: (editor: Editor) => void
  available?: (editor: Editor) => boolean
}

export const COMMANDS: CommandItem[] = [
  {
    id: "text",
    title: "Text",
    description: "Plain paragraph",
    group: "Style",
    run: editor => editor.chain().focus().setParagraph().run(),
  },
  {
    id: "heading-1",
    title: "Heading 1",
    description: "Large section heading",
    group: "Style",
    run: editor =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    id: "heading-2",
    title: "Heading 2",
    description: "Medium section heading",
    group: "Style",
    run: editor =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    id: "bullet-list",
    title: "Bullet List",
    description: "Unordered list",
    group: "List",
    run: editor => editor.chain().focus().toggleBulletList().run(),
  },
  {
    id: "blockquote",
    title: "Quote",
    description: "Block quotation",
    group: "Style",
    run: editor => editor.chain().focus().toggleBlockquote().run(),
  },
]
