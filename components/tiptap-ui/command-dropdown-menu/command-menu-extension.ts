import { Extension } from "@tiptap/core"

export const CommandMenuExtension = Extension.create({
  name: "commandMenu",

  addStorage() {
    return {
      active: false,
      query: "",
      range: null as null | { from: number; to: number },
    }
  },

  onTransaction({ editor, transaction }) {
    const { selection } = transaction
    if (!selection.empty) return

    const cursor = selection.from
    const textBefore = editor.state.doc.textBetween(
      Math.max(0, cursor - 60),
      cursor,
      "\n",
      "\0"
    )

    const match = textBefore.match(/\/([\w]*)$/)

    if (!match) {
      this.storage.active = false
      this.storage.query = ""
      this.storage.range = null
      return
    }

    this.storage.active = true
    this.storage.query = match[1]
    this.storage.range = {
      from: cursor - match[0].length,
      to: cursor,
    }
  },
})
