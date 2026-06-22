import { AiToolForm } from "@/components/admin/ai-tool-form";

export const metadata = {
  title: "New AI Tool | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewAiToolPage() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          New AI tool
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Create a database-backed tool.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Keep the review fields practical. Scores can stay at 0 until testing
          is complete.
        </p>
      </div>
      <AiToolForm action="/api/admin/tools" submitLabel="Create tool" />
    </div>
  );
}
