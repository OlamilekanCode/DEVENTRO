import type { Metadata } from "next";

const siteUrl = "https://deventro.site";
const defaultTitle = "DevEntro";
const defaultDescription =
  "AI tool reviews, developer productivity guides, and practical workflow systems for builders.";
const defaultImage = "/deventro-workflow-hero.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export const siteMetadata = {
  name: defaultTitle,
  url: siteUrl,
  description: defaultDescription,
  image: defaultImage,
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: defaultTitle,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
