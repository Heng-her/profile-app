import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentBySlug, STUDENTS_DATA } from "@/data/students";
import { generateStudentMetadata, generatePersonJsonLd } from "@/seo/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  GraduationCap,
  BookOpen,
  Building2,
  MapPin,
  Briefcase,
  Send,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  UserCheck,
  CheckCircle,
  FolderGit2,
  Globe,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const student = getStudentBySlug(slug);
  if (!student) return {};
  return generateStudentMetadata(student);
}

export default async function StudentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  if (!student) {
    notFound();
  }

  const jsonLd = generatePersonJsonLd(student);

  // Find other student to switch quickly
  const otherStudent = STUDENTS_DATA.find((s) => s.slug !== student.slug);

  return (
    <div className="min-h-screen flex flex-col justify-between text-white selection:bg-cyan-500 selection:text-black">
      {/* Inject JSON-LD for Search Engine Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 pointer-events-auto">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home Showcase
          </Link>
        </div>

        {/* Profile Hero Header Card */}
        <section className="relative rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-3xl overflow-hidden p-[3px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 shadow-2xl shrink-0">
              <Image
                src={student.avatar}
                alt={student.name}
                fill
                priority
                sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
                className="object-cover rounded-[21px]"
              />
            </div>

            {/* Profile Title Info */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    {student.name}
                  </h1>
                  {student.khmerName && (
                    <span className="text-sm font-bold px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-khmer">
                      {student.khmerName}
                    </span>
                  )}
                </div>
                <p className="text-base md:text-lg font-semibold text-cyan-400 mt-2 flex items-center justify-center md:justify-start gap-2">
                  <UserCheck className="w-5 h-5" />
                  {student.role}
                </p>
              </div>

              {/* Bio Detail */}
              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
                {student.bioDetail}
              </p>

              {/* Quick Info Grid Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-slate-500 block text-[10px]">
                      Class
                    </span>
                    <span className="font-semibold text-white truncate">
                      {student.class}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-slate-500 block text-[10px]">
                      University
                    </span>
                    <span className="font-semibold text-white truncate">
                      {student.studyAt}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-slate-500 block text-[10px]">
                      Place of Birth
                    </span>
                    <span className="font-semibold text-white truncate">
                      {student.placeOfBirth}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-slate-500 block text-[10px]">
                      Current Role
                    </span>
                    <span className="font-semibold text-white truncate">
                      {student.workingAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Tech Stack & Subject */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Tech Stack */}
          <div className="md:col-span-7 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Technologies & Core Stack
            </h2>
            <p className="text-xs text-slate-400">
              Specialized tools, frameworks, and programming languages mastered
              by {student.name}.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {student.technologies.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Focus & Subject */}
          <div className="md:col-span-5 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Academic Specialization
              </h2>
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-sm font-semibold">
                {student.subject}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Currently pursuing degree at{" "}
                <strong className="text-white">{student.studyAt}</strong> as
                part of <strong className="text-white">{student.class}</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 text-xs text-slate-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Hometown: {student.placeOfBirth}</span>
            </div>
          </div>
        </section>

        {/* Section: Work Experience */}
        <section className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Work Experience & Career Journey
          </h2>

          <div className="space-y-6">
            {student.experience.map((exp, idx) => (
              <div
                key={idx}
                className="relative pl-6 border-l-2 border-cyan-500/40 space-y-1.5"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white">
                    {exp.role}{" "}
                    <span className="text-cyan-400">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Featured Projects */}
        <section className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-400" />
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {student.projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {proj.title}
                    </h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 p-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Social Media & Contact Info */}
        <section className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            Connect & Social Media
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {student.socials.github && (
              <a
                href={student.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/10 flex flex-col items-center gap-2 text-slate-200 transition-all group"
              >
                <Globe className="w-6 h-6 group-hover:scale-110 text-white transition-transform" />
                <span className="text-xs font-medium">GitHub</span>
              </a>
            )}

            {student.socials.linkedin && (
              <a
                href={student.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 flex flex-col items-center gap-2 text-slate-200 transition-all group"
              >
                <Globe className="w-6 h-6 group-hover:scale-110 text-blue-400 transition-transform" />
                <span className="text-xs font-medium">LinkedIn</span>
              </a>
            )}

            {student.socials.telegram && (
              <a
                href={student.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/10 flex flex-col items-center gap-2 text-slate-200 transition-all group"
              >
                <Send className="w-6 h-6 group-hover:scale-110 text-sky-400 transition-transform" />
                <span className="text-xs font-medium">Telegram</span>
              </a>
            )}

            {student.socials.facebook && (
              <a
                href={student.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-600/40 hover:bg-blue-600/10 flex flex-col items-center gap-2 text-slate-200 transition-all group"
              >
                <Globe className="w-6 h-6 group-hover:scale-110 text-blue-500 transition-transform" />
                <span className="text-xs font-medium">Facebook</span>
              </a>
            )}

            {student.socials.email && (
              <a
                href={`mailto:${student.socials.email}`}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 flex flex-col items-center gap-2 text-slate-200 transition-all group"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 text-cyan-400 transition-transform" />
                <span className="text-xs font-medium truncate w-full text-center">
                  Email
                </span>
              </a>
            )}

            {student.socials.phone && (
              <a
                href={`tel:${student.socials.phone}`}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 flex flex-col items-center gap-2 text-slate-200 transition-all group"
              >
                <Phone className="w-6 h-6 group-hover:scale-110 text-emerald-400 transition-transform" />
                <span className="text-xs font-medium truncate w-full text-center">
                  Phone
                </span>
              </a>
            )}
          </div>
        </section>

        {/* Switcher to Other Student Profile */}
        {otherStudent && (
          <section className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              All Student Profiles
            </Link>

            <Link
              href={`/${otherStudent.slug}`}
              className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-4 group"
            >
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-cyan-400 block">
                  Switch Profile
                </span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                  {otherStudent.name} ({otherStudent.role.split("&")[0]})
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
