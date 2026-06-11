"use client";

import { useState } from "react";
import LinkExtension from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code2,
  Heading2,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";

type RichTextEditorProps = {
  defaultHtml?: string | null;
  defaultMarkdown?: string;
  htmlName: string;
  markdownFallbackName: string;
};

const markdownToStarterHtml = (value: string): string => {
  const paragraphs = value
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return "";
  }

  return paragraphs
    .map((paragraph) => `<p>${paragraph.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</p>`)
    .join("");
};

export function RichTextEditor({
  defaultHtml,
  defaultMarkdown = "",
  htmlName,
  markdownFallbackName,
}: RichTextEditorProps) {
  const [html, setHtml] = useState(
    defaultHtml?.trim() || markdownToStarterHtml(defaultMarkdown),
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: html,
    editorProps: {
      attributes: {
        class:
          "rich-editor min-h-[420px] px-4 py-4 text-sm leading-7 outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      setHtml(currentEditor.getHTML());
    },
  });

  const setLink = () => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const controls = [
    {
      label: "Undo",
      icon: Undo2,
      onClick: () => editor?.chain().focus().undo().run(),
      isActive: false,
    },
    {
      label: "Redo",
      icon: Redo2,
      onClick: () => editor?.chain().focus().redo().run(),
      isActive: false,
    },
    {
      label: "Heading",
      icon: Heading2,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor?.isActive("heading", { level: 2 }) ?? false,
    },
    {
      label: "Bold",
      icon: Bold,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive("bold") ?? false,
    },
    {
      label: "Italic",
      icon: Italic,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive("italic") ?? false,
    },
    {
      label: "Quote",
      icon: Quote,
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: editor?.isActive("blockquote") ?? false,
    },
    {
      label: "Code",
      icon: Code2,
      onClick: () => editor?.chain().focus().toggleCode().run(),
      isActive: editor?.isActive("code") ?? false,
    },
    {
      label: "Bullet list",
      icon: List,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive("bulletList") ?? false,
    },
    {
      label: "Numbered list",
      icon: ListOrdered,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor?.isActive("orderedList") ?? false,
    },
    {
      label: "Link",
      icon: LinkIcon,
      onClick: setLink,
      isActive: editor?.isActive("link") ?? false,
    },
  ];

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <input type="hidden" name={htmlName} value={html} />
      <input type="hidden" name={markdownFallbackName} value={defaultMarkdown} />
      <div className="flex flex-wrap gap-1 border-b border-border bg-muted/50 px-3 py-2">
        {controls.map((control) => {
          const Icon = control.icon;

          return (
            <button
              key={control.label}
              type="button"
              aria-label={control.label}
              title={control.label}
              onClick={control.onClick}
              className={`inline-flex size-9 items-center justify-center rounded-md transition-colors ${
                control.isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
