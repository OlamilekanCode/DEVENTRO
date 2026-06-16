"use client";

import { useEffect } from "react";
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
  html: string;
  markdown: string;
  onChange: (content: { html: string; markdown: string }) => void;
};

const cleanText = (value: string | null | undefined): string =>
  value?.replace(/\s+/g, " ").trim() ?? "";

const inlineMarkdown = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? "";
  }

  if (!(node instanceof HTMLElement)) {
    return "";
  }

  const text = Array.from(node.childNodes).map(inlineMarkdown).join("");

  switch (node.tagName.toLowerCase()) {
    case "strong":
    case "b":
      return `**${text}**`;
    case "em":
    case "i":
      return `_${text}_`;
    case "code":
      return `\`${text}\``;
    case "a": {
      const href = node.getAttribute("href");
      return href ? `[${text}](${href})` : text;
    }
    case "br":
      return "\n";
    default:
      return text;
  }
};

const htmlToMarkdown = (html: string): string => {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  return Array.from(document.body.children)
    .map((element) => {
      const tagName = element.tagName.toLowerCase();

      if (tagName === "h2") {
        return `## ${cleanText(element.textContent)}`;
      }

      if (tagName === "h3") {
        return `### ${cleanText(element.textContent)}`;
      }

      if (tagName === "blockquote") {
        return cleanText(element.textContent)
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n");
      }

      if (tagName === "ul" || tagName === "ol") {
        return Array.from(element.children)
          .map((child, index) => {
            const prefix = tagName === "ol" ? `${index + 1}. ` : "- ";

            return `${prefix}${cleanText(child.textContent)}`;
          })
          .join("\n");
      }

      if (tagName === "pre") {
        return `\`\`\`\n${element.textContent?.trim() ?? ""}\n\`\`\``;
      }

      return Array.from(element.childNodes).map(inlineMarkdown).join("").trim();
    })
    .filter(Boolean)
    .join("\n\n");
};

export function RichTextEditor({ html, markdown, onChange }: RichTextEditorProps) {
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
      const nextHtml = currentEditor.getHTML();

      onChange({
        html: nextHtml,
        markdown: htmlToMarkdown(nextHtml) || markdown,
      });
    },
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === html) {
      return;
    }

    editor.commands.setContent(html, { emitUpdate: false });
  }, [editor, html]);

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
