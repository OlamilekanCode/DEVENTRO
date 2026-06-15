import ReactMarkdown from "react-markdown";
import sanitizeHtml from "sanitize-html";

import type { PublicBlogPost } from "@/lib/public-posts";

type ArticleContentProps = {
  post: PublicBlogPost;
};

const sanitizeRichHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [
      "a",
      "blockquote",
      "br",
      "code",
      "em",
      "h2",
      "h3",
      "hr",
      "img",
      "li",
      "ol",
      "p",
      "pre",
      "s",
      "strong",
      "ul",
    ],
    allowedAttributes: {
      a: ["href", "rel", "target", "title"],
      img: ["alt", "decoding", "height", "loading", "src", "title", "width"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
  });

export function ArticleContent({ post }: ArticleContentProps) {
  const shouldRenderRichHtml =
    post.contentFormat === "rich" && Boolean(post.contentHtml?.trim());

  if (shouldRenderRichHtml && post.contentHtml) {
    return (
      <div
        className="rich-editor"
        dangerouslySetInnerHTML={{
          __html: sanitizeRichHtml(post.contentHtml),
        }}
      />
    );
  }

  return (
    <div className="markdown-preview">
      <ReactMarkdown>{post.contentMarkdown}</ReactMarkdown>
    </div>
  );
}
