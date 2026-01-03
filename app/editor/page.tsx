"use client"

import { SlashCommandExtension } from "@/components/tiptap-extension/slash-command-extension"
import {EditorContent, EditorContext, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import { MySlashMenu } from "@/components/tiptap-ui/my-slash-menu"
import { SuggestionMenu } from "@/components/tiptap-ui-utils/suggestion-menu";
import { SlashDropdownMenu } from "@/components/tiptap-ui/slash-dropdown-menu";

function MySlashMenu2() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: `
        <blockquote>
            <p>"The best way to predict the future is to invent it."</p><p>— Alan Kay</p>
        </blockquote>
        `,
  });
  return (
    <SlashDropdownMenu
      editor={editor}
      config={{
        enabledItems: [
          "text",
          "heading_1",
          "heading_2",
          "bullet_list",
          "quote",
        ],
        showGroups: true,
        itemGroups: {
          text: "Style",
          heading_1: "Style",
          heading_2: "Style",
          bullet_list: "Lists",
          quote: "Style",
        },
      }}
    />
  );
}

export default function MyEditor() {
    const editor = useEditor({
  immediatelyRender: false,
  extensions: [
    StarterKit,
    SlashCommandExtension, // ← REQUIRED
    
  ],
  content: "",
})

if (!editor) return null

return (
    <EditorContext.Provider value={{editor}}>
        <div className="relative">
        {/* Slash menu */}
        <MySlashMenu2 />

        {/* Editor */}
        <EditorContent editor={editor} />
      </div>
    </EditorContext.Provider>

)}