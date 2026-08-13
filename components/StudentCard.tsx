"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Student } from "@/data/students";
import {
  GraduationCap,
  BookOpen,
  Building2,
  MapPin,
  ArrowRight,
  Code,
  Sparkles,
} from "lucide-react";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="group relative rounded-3xl bg-zinc-950/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 transition-all duration-500 flex flex-col justify-between pointer-events-auto hover:border-yellow-500/50 hover:shadow-[0_0_35px_rgba(234,179,8,0.15)]">
      {/* Background Glow */}
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Header: Avatar & Name */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-[2px] bg-yellow-400 shadow-xl shadow-yellow-500/10 shrink-0">
              <Image
                src={student.avatar}
                alt={student.name}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover rounded-[14px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {student.name}
                </h3>
                {student.khmerName && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-yellow-300 font-khmer">
                    {student.khmerName}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-yellow-400 mt-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                {student.role}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border bg-yellow-500/10 text-yellow-300 border-yellow-500/30">
            {student.class.split("(")[0]}
          </span>
        </div>

        {/* Academic & Work Overview Grid */}
        <div className="grid grid-cols-1 gap-2.5 text-xs text-zinc-300 bg-black/60 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="text-zinc-400">Class:</span>
            <span className="font-medium text-white truncate">
              {student.class}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="text-zinc-400">Study At:</span>
            <span className="font-medium text-white truncate">
              {student.studyAt}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="text-zinc-400">Subject:</span>
            <span className="font-medium text-white truncate">
              {student.subject}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="text-zinc-400">Location:</span>
            <span className="font-medium text-white truncate">
              {student.placeOfBirth}
            </span>
          </div>
        </div>

        {/* Brief Description */}
        <p className="text-xs md:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
          {student.description}
        </p>

        {/* Technologies Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <Code className="w-3.5 h-3.5 text-yellow-400" />
            <span>Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {student.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-200 group-hover:border-yellow-500/40 transition-colors"
              >
                {tech}
              </span>
            ))}
            {student.technologies.length > 6 && (
              <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-white/5 text-zinc-400">
                +{student.technologies.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
        <Link
          href={`/${student.slug}`}
          className="w-full py-3 px-5 rounded-xl bg-yellow-400 text-black text-xs md:text-sm font-bold shadow-lg shadow-yellow-500/20 hover:bg-yellow-300 flex items-center justify-center gap-2 group/btn transition-all duration-300"
        >
          <span>View More Detail ({student.name})</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
