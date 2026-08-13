import React from "react";
import Metadata from "next";
import { STUDENTS_DATA } from "@/data/students";
import { Navbar } from "@/components/Navbar";
import { StudentCard } from "@/components/StudentCard";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/seo/config";
import { Sparkles, Code2, Users, Layers, ArrowDown } from "lucide-react";

export const metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20">
        {/* Hero Banner Header */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-6 pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Dual Developer Portfolio • Cambodia
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Meet Our Tech Duo{" "}
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Heng Her & Sok Nilihong
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Full-stack mobile app engineering meets human-centered UI/UX design. Explore our academic background, core technology stack, project highlights, and detailed student profiles.
          </p>

          {/* Quick Metrics */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>2 Student Engineers</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>10+ Core Technologies</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>RUPP & ITC University</span>
            </div>
          </div>
        </section>

        {/* Dual Student Showcase Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 pointer-events-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Users className="w-6 h-6 text-cyan-400" />
                Featured Student Profiles
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select a profile card below to view full details, experiences, and social contacts.
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
              Click &quot;View More Detail&quot; for Slug Route
            </div>
          </div>

          {/* Grid of 2 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {STUDENTS_DATA.map((student, idx) => (
              <StudentCard
                key={student.id}
                student={student}
                badgeAccent={idx === 0 ? "cyan" : "purple"}
              />
            ))}
          </div>
        </section>

        {/* Contact Us & Location Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
