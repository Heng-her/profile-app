import { seoConfig } from "./config";

interface BreadcrumbItem {
  name: string;
  item: string;
}

/** Schema.org BreadcrumbList — drop into a page via <JsonLd data={...} /> */
export function generateBreadcrumbsJsonLd(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `${seoConfig.siteUrl}${item.item}`,
    })),
  };
}

/** Schema.org NewsArticle for /article/[slug] pages */
export function generateArticleJsonLd(article: {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: [{ "@type": "Person", name: article.author }],
    publisher: {
      "@type": "Organization",
      name: seoConfig.siteName,
      logo: { "@type": "ImageObject", url: `${seoConfig.siteUrl}/logo.png` },
    },
    mainEntityOfPage: `${seoConfig.siteUrl}/article/${article.slug}`,
  };
}

/** Schema.org SoftwareApplication for /tools directory entries */
export function generateToolJsonLd(tool: {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    offers: { "@type": "Offer", price: tool.pricing === "Free" ? "0" : undefined, priceCurrency: "USD" },
  };
}
