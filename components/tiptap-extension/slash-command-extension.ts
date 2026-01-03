import { Extension } from "@tiptap/core"

export const SlashCommandExtension = Extension.create({
  name: "slashCommand",

  addStorage() {
    return {
      active: false,
      query: "",
      range: null as null | { from: number; to: number },
    }
  },

  addProseMirrorPlugins() {
    return []
  },

  onTransaction({ transaction, editor }) {
    const { selection } = transaction
    const { from } = selection

    if (!selection.empty) return

    const textBefore = editor.state.doc.textBetween(
      Math.max(0, from - 50),
      from,
      "\n",
      "\0"
    )

    const match = textBefore.match(/\/([\w]*)$/)

    if (match) {
      this.storage.active = true
      this.storage.query = match[1]
      this.storage.range = {
        from: from - match[0].length,
        to: from,
      }
    } else {
      this.storage.active = false
      this.storage.query = ""
      this.storage.range = null
    }
  },
})
