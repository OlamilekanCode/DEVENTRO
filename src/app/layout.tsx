import type { Metadata } from "next";
import "./globals.css";

import { siteMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  applicationName: siteMetadata.name,
  title: {
    default: siteMetadata.name,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  authors: [{ name: "DevEntro Team", url: siteMetadata.url }],
  creator: "DevEntro",
  publisher: "DevEntro",
  keywords: [
    "AI tools",
    "AI tool reviews",
    "developer productivity",
    "developer workflows",
    "AI coding tools",
  ],
  openGraph: {
    title: siteMetadata.name,
    description: siteMetadata.description,
    url: "/",
    siteName: siteMetadata.name,
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
        alt: "DevEntro AI workflow dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.name,
    description: siteMetadata.description,
    images: [siteMetadata.image],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
