import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    verification: {
      google: "googlea90e4568d19030b2",
    },
  };
}
