import type { AiTool } from "@/types/ai-tool";

export const aiTools: AiTool[] = [
  {
    id: "cursor",
    name: "Cursor",
    slug: "cursor",
    category: "Coding Assistant",
    tagline: "AI-first editor for everyday development work.",
    description:
      "Useful for code navigation, multi-file edits, refactors, and fast iteration inside a familiar editor workflow.",
    websiteUrl: "https://cursor.com",
    pricingSummary: "Free tier with paid plans",
    bestFor: ["Code editing", "Refactors", "Project navigation"],
    workflowFit: "Strong fit for developers who want AI close to the codebase.",
    reviewStatus: "testing",
    accentClass: "bg-teal-500",
    isFeatured: true,
  },
  {
    id: "claude",
    name: "Claude",
    slug: "claude",
    category: "AI Assistant",
    tagline: "Long-context assistant for planning, writing, and debugging.",
    description:
      "Best used for reasoning-heavy work, turning messy notes into plans, reviewing decisions, and drafting technical content.",
    websiteUrl: "https://claude.ai",
    pricingSummary: "Free tier with paid plans",
    bestFor: ["Planning", "Debugging", "Technical writing"],
    workflowFit: "Strong fit for deep thinking before and during builds.",
    reviewStatus: "testing",
    accentClass: "bg-amber-500",
    isFeatured: true,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    slug: "perplexity",
    category: "Research",
    tagline: "Search-backed research for technical discovery.",
    description:
      "Helpful for quick source-backed research, tool discovery, documentation hunting, and comparison prep.",
    websiteUrl: "https://www.perplexity.ai",
    pricingSummary: "Free tier with paid plans",
    bestFor: ["Research", "Source checking", "Discovery"],
    workflowFit: "Strong fit when a task starts with uncertain information.",
    reviewStatus: "queued",
    accentClass: "bg-blue-500",
    isFeatured: true,
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "Coding Assistant",
    tagline: "Code completion and assistant features inside developer tools.",
    description:
      "A practical baseline for comparing AI coding assistance across editors, pull requests, and daily implementation work.",
    websiteUrl: "https://github.com/features/copilot",
    pricingSummary: "Paid plans with limited free access",
    bestFor: ["Code completion", "Editor assistance", "GitHub workflows"],
    workflowFit: "Strong fit for teams already working deeply inside GitHub.",
    reviewStatus: "queued",
    accentClass: "bg-violet-500",
    isFeatured: false,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    slug: "chatgpt",
    category: "AI Assistant",
    tagline: "General AI workspace for coding, writing, and analysis.",
    description:
      "Useful across brainstorming, code explanation, learning support, lightweight automation, and content drafting.",
    websiteUrl: "https://chatgpt.com",
    pricingSummary: "Free tier with paid plans",
    bestFor: ["General assistance", "Learning", "Drafting"],
    workflowFit: "Flexible fit for builders who need one broad assistant.",
    reviewStatus: "testing",
    accentClass: "bg-emerald-500",
    isFeatured: false,
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    slug: "notion-ai",
    category: "Knowledge Workspace",
    tagline: "AI features inside notes, docs, and team knowledge bases.",
    description:
      "Useful for summarizing notes, drafting documentation, organizing research, and improving lightweight operations docs.",
    websiteUrl: "https://www.notion.so/product/ai",
    pricingSummary: "Paid add-on and bundled plans",
    bestFor: ["Notes", "Documentation", "Knowledge management"],
    workflowFit: "Good fit for teams already organizing work in Notion.",
    reviewStatus: "queued",
    accentClass: "bg-rose-500",
    isFeatured: false,
  },
];

export const featuredAiTools = aiTools.filter((tool) => tool.isFeatured);

export const aiToolCategories = Array.from(
  new Set(aiTools.map((tool) => tool.category)),
).sort();
