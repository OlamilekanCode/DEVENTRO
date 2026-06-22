import { TagForm } from "@/components/admin/tag-form";

export const metadata = {
  title: "New Tag | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewTagPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          New tag
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Create a blog tag.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Tags help describe article themes and workflow topics.
        </p>
      </div>
      <TagForm action="/api/admin/tags" submitLabel="Create tag" />
    </div>
  );
}
