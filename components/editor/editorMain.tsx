"use client";

import {SlashCommandExtension} from "@/components/tiptap-extension/slash-command-extension";
import {EditorContent, EditorContext, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {MySlashMenu} from "@/components/tiptap-ui/my-slash-menu";
import {SuggestionMenu} from "@/components/tiptap-ui-utils/suggestion-menu";
import {SlashDropdownMenu} from "@/components/tiptap-ui/slash-dropdown-menu";
import Placeholder from "@tiptap/extension-placeholder";
import {
  CommandMenu,
  CommandMenuExtension,
} from "../tiptap-ui/command-dropdown-menu";
import {HeadingButton} from "../tiptap-ui/heading-button";

import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/heading-node/heading-node.scss'

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
      //   SlashCommandExtension, // ← REQUIRED
      CommandMenuExtension,
      Placeholder.configure({
        placeholder: "Write, Press '/' for commands",
      }),
    ],
    content: "",
  });

  if (!editor) return null;

  return (
    <EditorContext.Provider value={{editor}}>
      <div className="relative">
        {/* Slash menu */}
        <MySlashMenu2 />
        {/* <CommandMenu /> */}
        {/* Editor */}
        <HeadingButton
          editor={editor}
          level={1}
          text="Heading 1"
          hideWhenUnavailable={true}
          showShortcut={true}
          onToggled={() => console.log(`Heading ${1} toggled!`)}
        />
        <HeadingButton
          editor={editor}
          level={2}
          text="Heading 2"
          hideWhenUnavailable={true}
          showShortcut={true}
          onToggled={() => console.log(`Heading ${2} toggled!`)}
        />
        <EditorContent editor={editor} />
      </div>
    </EditorContext.Provider>
  );
}
