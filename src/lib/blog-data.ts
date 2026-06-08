import type { BlogAuthor, BlogCategory, BlogPost, BlogTag } from "@/types/blog";

export const blogAuthors: BlogAuthor[] = [
  {
    id: "deventro-team",
    name: "DevEntro Team",
  },
];

export const blogCategories: BlogCategory[] = [
  {
    id: "ai-tools",
    name: "AI Tools",
    slug: "ai-tools",
    description: "Practical reviews and guides for AI tools used by builders.",
  },
  {
    id: "developer-productivity",
    name: "Developer Productivity",
    slug: "developer-productivity",
    description: "Systems, habits, and workflows for shipping better work.",
  },
  {
    id: "coding-assistants",
    name: "Coding Assistants",
    slug: "coding-assistants",
    description: "AI coding assistant tests, comparisons, and use cases.",
  },
  {
    id: "workflows-automation",
    name: "Workflows & Automation",
    slug: "workflows-automation",
    description: "Automation systems for developers, freelancers, and learners.",
  },
  {
    id: "freelancing",
    name: "Freelancing",
    slug: "freelancing",
    description: "AI-assisted client work, delivery systems, and operations.",
  },
  {
    id: "tech-learning",
    name: "Tech Learning",
    slug: "tech-learning",
    description: "Study systems and learning workflows for technical growth.",
  },
  {
    id: "saas-reviews",
    name: "SaaS Reviews",
    slug: "saas-reviews",
    description: "Useful SaaS products reviewed through a builder lens.",
  },
  {
    id: "comparisons",
    name: "Comparisons",
    slug: "comparisons",
    description: "Clear tool comparisons for real workflow decisions.",
  },
];

export const blogTags: BlogTag[] = [
  { id: "ai-coding", name: "AI Coding", slug: "ai-coding" },
  { id: "tool-review", name: "Tool Review", slug: "tool-review" },
  { id: "freelance-workflow", name: "Freelance Workflow", slug: "freelance-workflow" },
  { id: "learning-system", name: "Learning System", slug: "learning-system" },
  { id: "productivity", name: "Productivity", slug: "productivity" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "best-ai-coding-tools-2026",
    title: "Best AI Coding Tools for Developers in 2026",
    slug: "best-ai-coding-tools-for-developers-2026",
    excerpt:
      "A practical look at code assistants, editor workflows, and when each tool is worth using.",
    contentMarkdown:
      "This draft will become the main AI coding tools review for developers.",
    featuredImage: "/deventro-workflow-hero.png",
    coverAltText: "AI workflow dashboard illustration",
    categoryId: "ai-tools",
    tags: ["ai-coding", "tool-review", "productivity"],
    status: "published",
    author: "deventro-team",
    seoTitle: "Best AI Coding Tools for Developers in 2026",
    seoDescription:
      "Compare practical AI coding tools for developers, including real workflow fit and productivity tradeoffs.",
    canonicalUrl: "/blog/best-ai-coding-tools-for-developers-2026",
    ogImage: "/deventro-workflow-hero.png",
    affiliateDisclosureEnabled: true,
    pinterestTitle: "Best AI Coding Tools for Developers in 2026",
    pinterestDescription:
      "A practical guide to AI coding tools, workflow fit, and productivity tradeoffs.",
    readingTime: 7,
    publishedAt: "2026-06-06T09:00:00.000Z",
    createdAt: "2026-06-06T09:00:00.000Z",
    updatedAt: "2026-06-06T09:00:00.000Z",
  },
  {
    id: "freelancer-ai-client-workflows",
    title: "How Freelancers Can Build Faster Client Workflows With AI",
    slug: "how-freelancers-can-build-faster-client-workflows-with-ai",
    excerpt:
      "From brief intake to delivery notes, this guide maps where AI actually saves time.",
    contentMarkdown:
      "This draft will become a practical freelancer workflow guide.",
    featuredImage: "/deventro-workflow-hero.png",
    coverAltText: "AI workflow dashboard illustration",
    categoryId: "freelancing",
    tags: ["freelance-workflow", "productivity"],
    status: "published",
    author: "deventro-team",
    seoTitle: "How Freelancers Can Build Faster Client Workflows With AI",
    seoDescription:
      "Learn where AI can help freelancers improve client intake, execution, delivery, and follow-up workflows.",
    canonicalUrl: "/blog/how-freelancers-can-build-faster-client-workflows-with-ai",
    ogImage: "/deventro-workflow-hero.png",
    affiliateDisclosureEnabled: false,
    pinterestTitle: "Faster Client Workflows With AI",
    pinterestDescription:
      "A practical AI workflow guide for freelancers managing client work.",
    readingTime: 6,
    publishedAt: "2026-06-05T09:00:00.000Z",
    createdAt: "2026-06-05T09:00:00.000Z",
    updatedAt: "2026-06-05T09:00:00.000Z",
  },
  {
    id: "practical-ai-study-system-tech-learners",
    title: "A Practical AI Study System for Tech Learners",
    slug: "practical-ai-study-system-for-tech-learners",
    excerpt:
      "A repeatable system for researching, practicing, summarizing, and building in public.",
    contentMarkdown:
      "This draft will become a study system guide for tech learners.",
    featuredImage: "/deventro-workflow-hero.png",
    coverAltText: "AI workflow dashboard illustration",
    categoryId: "tech-learning",
    tags: ["learning-system", "productivity"],
    status: "published",
    author: "deventro-team",
    seoTitle: "A Practical AI Study System for Tech Learners",
    seoDescription:
      "Use AI to research, practice, summarize, and build stronger learning loops while studying technology.",
    canonicalUrl: "/blog/practical-ai-study-system-for-tech-learners",
    ogImage: "/deventro-workflow-hero.png",
    affiliateDisclosureEnabled: false,
    pinterestTitle: "A Practical AI Study System for Tech Learners",
    pinterestDescription:
      "A repeatable AI-assisted study workflow for students learning technology.",
    readingTime: 5,
    publishedAt: "2026-06-04T09:00:00.000Z",
    createdAt: "2026-06-04T09:00:00.000Z",
    updatedAt: "2026-06-04T09:00:00.000Z",
  },
];

export const blogCategoriesById = Object.fromEntries(
  blogCategories.map((category) => [category.id, category])
);

export function getPublishedBlogPosts() {
  return blogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => {
      const aDate = a.publishedAt ?? a.createdAt;
      const bDate = b.publishedAt ?? b.createdAt;

      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPost, limit = 2) {
  return getPublishedBlogPosts()
    .filter(
      (candidate) =>
        candidate.id !== post.id && candidate.categoryId === post.categoryId
    )
    .slice(0, limit);
}
