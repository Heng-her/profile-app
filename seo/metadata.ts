import { Metadata } from "next";
import { seoConfig } from "./config";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Builds a Next.js Metadata object (title, OG, Twitter, canonical, robots)
 * for a page. Call from any page/layout's `export const metadata`.
 */
export function constructMetadata({
  title,
  description = seoConfig.defaultDescription,
  path = "",
  image = seoConfig.defaultImage,
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const url = `${seoConfig.siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: seoConfig.siteName,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: seoConfig.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: { index: !noIndex, follow: !noIndex },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    keywords: seoConfig.keywords,
  };
}
