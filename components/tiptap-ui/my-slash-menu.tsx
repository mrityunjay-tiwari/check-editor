"use client"

import { useContext, useEffect, useState } from "react"
import { EditorContext } from "@tiptap/react"
import { slashItems } from "./slash-menu-config"

export function MySlashMenu() {
  const { editor } = useContext(EditorContext)
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (!editor) return

    const update = () => {
      // force React re-render
      forceUpdate(v => v + 1)
    }

    editor.on("transaction", update)
    editor.on("update", update)

    return () => {
      editor.off("transaction", update)
      editor.off("update", update)
    }
  }, [editor])

  if (!editor) return null

  const storage: any = (editor.storage as any).slashCommand

  if (!storage?.active) return null

  const filtered = slashItems.filter(item =>
    item.title.toLowerCase().includes(storage.query.toLowerCase())
  )

  if (!filtered.length) return null

  return (
    <div className="relative z-50 mt-14 w-52 rounded-lg border bg-white shadow-lg">
      {filtered.map(item => (
        <button
          key={item.title}
          onClick={() => {
            editor
              .chain()
              .focus()
              .deleteRange(storage.range)
              .run()

            item.action(editor)
            storage.active = false
          }}
          className="flex w-full px-3 py-2 text-left hover:bg-muted"
        >
          <div>
            <div className="text-sm font-medium">{item.title}</div>
            <div className="text-xs text-muted-foreground">
              {item.group}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
