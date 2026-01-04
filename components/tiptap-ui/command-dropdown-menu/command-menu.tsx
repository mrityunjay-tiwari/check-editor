"use client"

import { useContext, useEffect, useState } from "react"
import { EditorContext } from "@tiptap/react"
import { useCommandMenu } from "./use-command-menu"
import "./command-menu.css"

export function CommandMenu() {
  const { editor } = useContext(EditorContext)
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (!editor) return

    const update = () => {
      forceUpdate(v => v + 1)
    }

    editor.on("transaction", update)

    return () => {
      editor.off("transaction", update)
    }
  }, [editor])

  // ✅ ALWAYS call hooks
  const state = (editor?.storage as any).commandMenu
  const items = useCommandMenu(editor, state?.query ?? "")

  // ✅ Conditional rendering AFTER hooks
  if (!editor) return null
  if (!state?.active) return null
  if (!items.length) return null

  return (
    <div className="command-menu">
      {items.map(item => (
        <button
          key={item.id}
          className="command-menu-item"
          onClick={() => {
            editor
              .chain()
              .focus()
              .deleteRange(state.range)
              .run()

            item.run(editor)
            state.active = false
          }}
        >
          <div className="title">{item.title}</div>
          {item.description && (
            <div className="desc">{item.description}</div>
          )}
        </button>
      ))}
    </div>
  )
}
