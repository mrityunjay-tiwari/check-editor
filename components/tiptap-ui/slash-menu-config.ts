export type SlashItem = {
  title: string
  group: string
  keywords?: string[]
  action: (editor: any) => void
}

export const slashItems: SlashItem[] = [
  {
    title: "Text",
    group: "Style",
    action: (editor) =>
      editor.chain().focus().setParagraph().run(),
  },
  {
    title: "Heading 1",
    group: "Style",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: "Heading 2",
    group: "Style",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: "Heading 3",
    group: "Style",
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    title: "Bullet List",
    group: "Lists",
    action: (editor) =>
      editor.chain().focus().toggleBulletList().run(),
  },
  {
    title: "Quote",
    group: "Style",
    action: (editor) =>
      editor.chain().focus().toggleBlockquote().run(),
  },
]
