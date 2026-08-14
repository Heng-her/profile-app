import { Student } from "@/data/students";

export const SITE_CONFIG = {
  title: "Dual Developer Portfolio | Her Bunheng & Sokny Lyhorng",
  description:
    "Interactive 3D Profile Application showcasing Her Bunheng (Senior Full-Stack & Mobile Developer) and Sokny Lyhorng (UI/UX & Frontend Developer).",
  url: "https://profile-app-pi-tan.vercel.app",
  author: "Her Bunheng & Sokny Lyhorng",
  locale: "en_US",
  type: "website",
  keywords: [
    "Her Bunheng",
    "ហ៊ឺប៊ុនហេនង",
    "Sokny Lyhorng",
    "សុខនី លីហ័ង",
    "Developer Portfolio",
    "Cambodia Software Engineer",
    "RUPP Student",
    "ITC Student",
    "Next.js",
    "React",
    "Vue.js",
    "Flutter",
    "3D Spline Portfolio",
  ],
};

export const seoConfig = {
  siteName: SITE_CONFIG.title,
  defaultTitle: SITE_CONFIG.title,
  siteUrl: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  defaultDescription: SITE_CONFIG.description,
  defaultImage: "/image.png",
  twitterHandle: "@heng_her",
  keywords: SITE_CONFIG.keywords,
};

export function generateStudentMetadata(student: Student) {
  const title = `${student.name} (${student.khmerName || ""}) - ${student.role} Portfolio`;
  const description = `${student.name} is a student at ${student.studyAt} (${student.class}) studying ${student.subject}. Skilled in ${student.technologies.join(", ")}. Working at ${student.workingAt}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `${SITE_CONFIG.url}/${student.slug}`,
      images: [
        {
          url: student.avatar,
          width: 800,
          height: 800,
          alt: student.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [student.avatar],
    },
  };
}

export function generatePersonJsonLd(student: Student) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: student.name,
    alternateName: student.khmerName,
    jobTitle: student.role,
    worksFor: {
      "@type": "Organization",
      name: student.workingAt,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: student.studyAt,
    },
    knowsAbout: student.technologies,
    homeLocation: student.placeOfBirth,
    description: student.description,
    image: student.avatar,
    sameAs: Object.values(student.socials).filter(Boolean),
  };
}
