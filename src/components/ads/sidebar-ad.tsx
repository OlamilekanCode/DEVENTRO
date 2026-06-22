type SidebarAdProps = {
  label?: string;
};

export function SidebarAd({
  label = "Sidebar advertisement",
}: SidebarAdProps) {
  return (
    <aside
      aria-label={label}
      className="hidden rounded-md border border-dashed border-border bg-card p-5 text-center text-sm font-medium uppercase text-muted-foreground lg:block"
      style={{ contentVisibility: "auto", containIntrinsicSize: "280px" }}
    >
      Sidebar advertisement
    </aside>
  );
}
