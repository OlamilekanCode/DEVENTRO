"use client";

import { useState } from "react";

import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { BlogPostContentFormat } from "@/types/blog";

type ContentEditorFieldProps = {
  defaultFormat: BlogPostContentFormat;
  defaultMarkdown: string;
  defaultHtml?: string | null;
};

export function ContentEditorField({
  defaultFormat,
  defaultMarkdown,
  defaultHtml,
}: ContentEditorFieldProps) {
  const [contentFormat, setContentFormat] =
    useState<BlogPostContentFormat>(defaultFormat);

  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-foreground">Content</span>
        <select
          name="contentFormat"
          value={contentFormat}
          onChange={(event) =>
            setContentFormat(event.target.value as BlogPostContentFormat)
          }
          className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        >
          <option value="markdown">Markdown</option>
          <option value="rich">Rich editor</option>
        </select>
      </div>

      {contentFormat === "rich" ? (
        <RichTextEditor
          htmlName="contentHtml"
          markdownFallbackName="contentMarkdown"
          defaultHtml={defaultHtml}
          defaultMarkdown={defaultMarkdown}
        />
      ) : (
        <>
          <input type="hidden" name="contentHtml" value={defaultHtml ?? ""} />
          <MarkdownEditor name="contentMarkdown" defaultValue={defaultMarkdown} />
        </>
      )}
    </div>
  );
}
