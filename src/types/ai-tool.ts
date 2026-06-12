export type AiToolStatus = "reviewed" | "testing" | "queued";

export type AiTool = {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  pricingSummary: string;
  bestFor: string[];
  workflowFit: string;
  reviewStatus: AiToolStatus;
  accentClass: string;
  isFeatured: boolean;
};
