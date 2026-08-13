export interface StudentProject {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface StudentExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface StudentSocials {
  github?: string;
  linkedin?: string;
  telegram?: string;
  facebook?: string;
  email?: string;
  phone?: string;
}

export interface Student {
  id: string;
  slug: string;
  name: string;
  khmerName?: string;
  role: string;
  avatar: string;
  class: string;
  studyAt: string;
  subject: string;
  technologies: string[];
  placeOfBirth: string;
  workingAt: string;
  description: string;
  bioDetail: string;
  socials: StudentSocials;
  experience: StudentExperience[];
  projects: StudentProject[];
}

export const STUDENTS_DATA: Student[] = [
  {
    id: "1",
    slug: "heng-her",
    name: "Heng Her",
    khmerName: "ហេង ហ៊ឺ",
    role: "Senior Mobile & Full-Stack Engineer",
    avatar: "/images/heng_her.jpg",
    class: "Software Engineering (SE-Batch 12)",
    studyAt: "Royal University of Phnom Penh (RUPP)",
    subject: "Mobile Application & Cloud Systems",
    technologies: [
      "React",
      "Next.js",
      "Flutter",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "PostgreSQL",
      "Docker",
    ],
    placeOfBirth: "Battambang Province, Cambodia",
    workingAt: "Senior Mobile Developer @ TechLab Cambodia",
    description:
      "Passionate full-stack & mobile engineer specializing in cross-platform mobile apps with Flutter and ultra-fast web experiences with Next.js & TypeScript.",
    bioDetail:
      "Heng Her is a dedicated software developer with over 4 years of experience crafting interactive digital products. He focuses on scalable mobile application architecture, state management, and real-time cloud backends. He actively mentors junior developers and contributes to open-source Cambodian developer communities.",
    socials: {
      github: "https://github.com/Heng-her",
      linkedin: "https://linkedin.com/in/heng-her",
      telegram: "https://t.me/heng_her",
      facebook: "https://facebook.com/heng.her.dev",
      email: "heng.her.dev@gmail.com",
      phone: "+855 12 345 678",
    },
    experience: [
      {
        role: "Senior Mobile Developer",
        company: "TechLab Cambodia",
        period: "2024 - Present",
        description:
          "Leading cross-platform mobile app development with Flutter & Next.js backend services, serving 50k+ active users.",
      },
      {
        role: "Full-Stack Software Engineer",
        company: "Phnom Penh Digital Studio",
        period: "2022 - 2024",
        description:
          "Engineered REST & GraphQL APIs using Node.js, Next.js, and PostgreSQL for fintech and e-commerce platforms.",
      },
    ],
    projects: [
      {
        title: "3D Profile Companion App",
        description:
          "Interactive WebGL profile application featuring Spline 3D rendering, dark mode glassmorphism, and responsive detail routing.",
        tech: ["Next.js", "TypeScript", "Spline", "TailwindCSS"],
        link: "https://github.com/Heng-her/profile-app",
      },
      {
        title: "Cambodia Travel Guide & Booking",
        description:
          "Flutter mobile application for exploring Cambodian eco-tourism destinations with offline caching and interactive maps.",
        tech: ["Flutter", "Dart", "Firebase", "Google Maps API"],
        link: "https://github.com/Heng-her",
      },
    ],
  },
  {
    id: "2",
    slug: "sok-nilihong",
    name: "Sok Nilihong",
    khmerName: "សុខ និលីហុង",
    role: "UI/UX Specialist & Frontend Engineer",
    avatar: "/images/sok_nilihong.jpg",
    class: "Information Technology (IT-Batch 12)",
    studyAt: "Institute of Technology of Cambodia (ITC)",
    subject: "UI/UX Design & Modern Web Systems",
    technologies: [
      "Vue.js",
      "React",
      "Figma",
      "Nuxt.js",
      "TailwindCSS",
      "TypeScript",
      "GraphQL",
      "Framer Motion",
    ],
    placeOfBirth: "Siem Reap Province, Cambodia",
    workingAt: "Lead UI/UX Engineer @ Digital Innovators",
    description:
      "Creative frontend developer and designer crafting sleek human-centered user interfaces, web animation systems, and modern Vue/React applications.",
    bioDetail:
      "Sok Nilihong combines visual aesthetics with technical rigor. With background in both Computer Science and Graphic Design, she creates intuitive visual hierarchy, responsive Tailwind systems, and seamless user experiences across mobile and web interfaces.",
    socials: {
      github: "https://github.com/nilihong",
      linkedin: "https://linkedin.com/in/sok-nilihong",
      telegram: "https://t.me/sok_nilihong",
      facebook: "https://facebook.com/sok.nilihong.ui",
      email: "sok.nilihong@gmail.com",
      phone: "+855 98 765 432",
    },
    experience: [
      {
        role: "Lead UI/UX & Frontend Engineer",
        company: "Digital Innovators",
        period: "2023 - Present",
        description:
          "Architecting enterprise design systems in Figma and translating them into high-performance Vue & React web applications.",
      },
      {
        role: "Frontend Developer Intern",
        company: "Angkor Tech Solutions",
        period: "2022 - 2023",
        description:
          "Developed responsive customer dashboards and landing pages using Vue.js, TailwindCSS, and Pinia state management.",
      },
    ],
    projects: [
      {
        title: "Kbach Khmer UI Component Library",
        description:
          "Custom design system and accessible component library tailored for Cambodian web applications and localization.",
        tech: ["Vue.js", "TailwindCSS", "Storybook", "TypeScript"],
        link: "https://github.com/nilihong",
      },
      {
        title: "Smart Campus Dashboard",
        description:
          "Real-time analytics dashboard for monitoring university lab reservations, course schedules, and student attendance.",
        tech: ["React", "Next.js", "Chart.js", "TailwindCSS"],
        link: "https://github.com/nilihong",
      },
    ],
  },
];

export function getStudentBySlug(slug: string): Student | undefined {
  return STUDENTS_DATA.find((s) => s.slug === slug.toLowerCase());
}
