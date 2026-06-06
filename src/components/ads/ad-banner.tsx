type AdBannerProps = {
  label: string;
  variant?: "top" | "footer";
};

export function AdBanner({ label, variant = "top" }: AdBannerProps) {
  return (
    <aside
      aria-label={label}
      className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      <div
        className={[
          "flex min-h-20 items-center justify-center rounded-md border border-dashed border-border bg-card/70 text-xs font-medium uppercase text-muted-foreground",
          variant === "footer" ? "mb-8 mt-10" : "my-4",
        ].join(" ")}
      >
        Advertisement
      </div>
    </aside>
  );
}
