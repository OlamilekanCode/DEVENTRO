"use client";

import { useMemo, useRef, useState } from "react";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Pencil,
  Quote,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

type MarkdownEditorProps = {
  defaultValue?: string;
  name: string;
};

type EditorMode = "write" | "preview";

type FormatAction = {
  label: string;
  icon: typeof Bold;
  before: string;
  after?: string;
  placeholder: string;
  block?: boolean;
};

const formatActions: FormatAction[] = [
  {
    label: "Heading",
    icon: Heading2,
    before: "## ",
    placeholder: "Heading",
    block: true,
  },
  {
    label: "Bold",
    icon: Bold,
    before: "**",
    after: "**",
    placeholder: "bold text",
  },
  {
    label: "Italic",
    icon: Italic,
    before: "_",
    after: "_",
    placeholder: "italic text",
  },
  {
    label: "Quote",
    icon: Quote,
    before: "> ",
    placeholder: "Quote",
    block: true,
  },
  {
    label: "Code",
    icon: Code2,
    before: "`",
    after: "`",
    placeholder: "code",
  },
  {
    label: "Bullet list",
    icon: List,
    before: "- ",
    placeholder: "List item",
    block: true,
  },
  {
    label: "Numbered list",
    icon: ListOrdered,
    before: "1. ",
    placeholder: "List item",
    block: true,
  },
  {
    label: "Link",
    icon: LinkIcon,
    before: "[",
    after: "](https://example.com)",
    placeholder: "link text",
  },
];

export function MarkdownEditor({ defaultValue = "", name }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<EditorMode>("write");
  const [value, setValue] = useState(defaultValue);

  const wordCount = useMemo(() => {
    return value.trim() ? value.trim().split(/\s+/).length : 0;
  }, [value]);

  const applyFormat = (action: FormatAction) => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end) || action.placeholder;
    const prefix = action.block && start > 0 && value[start - 1] !== "\n" ? "\n" : "";
    const suffix = action.block ? "\n" : "";
    const formattedText = `${prefix}${action.before}${selectedText}${action.after ?? ""}${suffix}`;
    const nextValue = `${value.slice(0, start)}${formattedText}${value.slice(end)}`;

    setValue(nextValue);

    window.requestAnimationFrame(() => {
      textarea.focus();
      const selectionStart = start + prefix.length + action.before.length;
      const selectionEnd = selectionStart + selectedText.length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/50 px-3 py-2">
        <div className="flex flex-wrap gap-1">
          {formatActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                aria-label={action.label}
                title={action.label}
                onClick={() => applyFormat(action)}
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                <Icon className="size-4" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
            {wordCount} words
          </span>
          <div className="inline-flex rounded-md border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => setMode("write")}
              className={`inline-flex h-8 items-center gap-1.5 rounded px-2.5 text-xs font-semibold ${
                mode === "write"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground"
              }`}
            >
              <Pencil className="size-3.5" aria-hidden="true" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`inline-flex h-8 items-center gap-1.5 rounded px-2.5 text-xs font-semibold ${
                mode === "preview"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground"
              }`}
            >
              <Eye className="size-3.5" aria-hidden="true" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          required
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={16}
          className="min-h-[420px] w-full resize-y border-0 bg-background px-4 py-4 font-mono text-sm leading-7 text-foreground outline-none"
        />
      ) : (
        <>
          <input type="hidden" name={name} value={value} />
          <div className="min-h-[420px] px-5 py-5">
            {value.trim() ? (
              <div className="markdown-preview">
                <ReactMarkdown>{value}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nothing to preview.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
