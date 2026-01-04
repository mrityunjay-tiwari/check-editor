import { useMemo } from "react"
import type { Editor } from "@tiptap/react"
import { COMMANDS, CommandItem } from "./command-menu.config"

export function useCommandMenu(editor: Editor | null, query: string) {
  return useMemo(() => {
    if (!editor) return []

    const q = query.toLowerCase()

    return COMMANDS.filter(cmd => {
      if (cmd.available && !cmd.available(editor)) return false
      if (!q) return true
      return (
        cmd.title.toLowerCase().includes(q) ||
        cmd.keywords?.some(k => k.includes(q))
      )
    })
  }, [editor, query])
}
