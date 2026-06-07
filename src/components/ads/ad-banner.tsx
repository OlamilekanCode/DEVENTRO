type AdBannerProps = {
  label: string;
  variant?: "top" | "inline" | "footer";
};

export function AdBanner({ label, variant = "top" }: AdBannerProps) {
  return (
    <aside
      aria-label={label}
      className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      <div
        className={[
          "flex items-center justify-center rounded-md border border-dashed border-border bg-card/70 text-xs font-medium uppercase text-muted-foreground",
          variant === "top" ? "my-6 min-h-16" : "",
          variant === "inline" ? "my-10 min-h-20" : "",
          variant === "footer" ? "mb-8 mt-10 min-h-16" : "",
        ].join(" ")}
      >
        Advertisement
      </div>
    </aside>
  );
}
