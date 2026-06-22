import { CategoryForm } from "@/components/admin/category-form";

export const metadata = {
  title: "New Category | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewCategoryPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          New category
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Create a blog category.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Categories organize posts and power public category pages.
        </p>
      </div>
      <CategoryForm
        action="/api/admin/categories"
        submitLabel="Create category"
      />
    </div>
  );
}
