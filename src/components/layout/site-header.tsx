import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/comparisons", label: "Comparisons" },
  { href: "/newsletter", label: "Newsletter" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/Logo 1.png"
            alt="DevEntro"
            width={174}
            height={42}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
