import { MetadataRoute } from "next";
import { STUDENTS_DATA } from "@/data/students";
import { SITE_CONFIG } from "@/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const studentRoutes: MetadataRoute.Sitemap = STUDENTS_DATA.map((student) => ({
    url: `${baseUrl}/${student.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...routes, ...studentRoutes];
}
