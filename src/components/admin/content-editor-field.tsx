"use client";

import { useState } from "react";
import { Eye, FileText, Type } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { BlogPostContentFormat } from "@/types/blog";

type ContentEditorFieldProps = {
  defaultFormat: BlogPostContentFormat;
  defaultMarkdown: string;
  defaultHtml?: string | null;
};

type ContentEditorMode = BlogPostContentFormat | "preview";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const markdownToStarterHtml = (value: string): string => {
  const blocks = value
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      if (block.startsWith("### ")) {
        return `<h3>${escapeHtml(block.slice(4))}</h3>`;
      }

      if (block.startsWith("## ")) {
        return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      }

      if (block.startsWith("> ")) {
        return `<blockquote><p>${escapeHtml(block.slice(2))}</p></blockquote>`;
      }

      return `<p>${escapeHtml(block).replaceAll("\n", "<br>")}</p>`;
    })
    .join("");
};

export function ContentEditorField({
  defaultFormat,
  defaultMarkdown,
  defaultHtml,
}: ContentEditorFieldProps) {
  const [editFormat, setEditFormat] =
    useState<BlogPostContentFormat>(defaultFormat);
  const [mode, setMode] = useState<ContentEditorMode>(defaultFormat);
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [html, setHtml] = useState(
    defaultHtml?.trim() || markdownToStarterHtml(defaultMarkdown),
  );

  const setEditorMode = (nextMode: ContentEditorMode) => {
    setMode(nextMode);

    if (nextMode === "markdown" || nextMode === "rich") {
      setEditFormat(nextMode);
    }
  };

  const handleMarkdownChange = (nextMarkdown: string) => {
    setMarkdown(nextMarkdown);
    setHtml(markdownToStarterHtml(nextMarkdown));
  };

  const editorModes: {
    value: ContentEditorMode;
    label: string;
    icon: typeof FileText;
  }[] = [
    { value: "markdown", label: "Markdown", icon: FileText },
    { value: "rich", label: "Rich editor", icon: Type },
    { value: "preview", label: "Preview", icon: Eye },
  ];

  return (
    <div className="grid gap-3">
      <input type="hidden" name="contentFormat" value={editFormat} />
      <input type="hidden" name="contentMarkdown" value={markdown} />
      <input type="hidden" name="contentHtml" value={html} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-foreground">Content</span>
        <div className="inline-flex w-full rounded-md border border-border bg-background p-1 sm:w-auto">
          {editorModes.map((editorMode) => {
            const Icon = editorMode.icon;

            return (
              <button
                key={editorMode.value}
                type="button"
                onClick={() => setEditorMode(editorMode.value)}
                className={`inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded px-3 text-xs font-semibold transition-colors sm:flex-none ${
                  mode === editorMode.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {editorMode.label}
              </button>
            );
          })}
        </div>
      </div>

      {mode === "rich" ? (
        <RichTextEditor
          html={html}
          markdown={markdown}
          onChange={({ html: nextHtml, markdown: nextMarkdown }) => {
            setHtml(nextHtml);
            setMarkdown(nextMarkdown);
          }}
        />
      ) : null}

      {mode === "markdown" ? (
        <MarkdownEditor value={markdown} onChange={handleMarkdownChange} />
      ) : null}

      {mode === "preview" ? (
        <div className="min-h-[420px] rounded-md border border-border bg-background px-5 py-5">
          {markdown.trim() ? (
            <div className="markdown-preview">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing to preview.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
