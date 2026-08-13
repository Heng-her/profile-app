import React from "react";
import Link from "next/link";
import { STUDENTS_DATA } from "@/data/students";
import { Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/90 backdrop-blur-2xl py-12 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-black">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-white tracking-wider text-base">
                DEV<span className="text-yellow-400">.DUO</span>
              </span>
              <p className="text-xs text-zinc-400">
                Dual Student Developer Portfolio
              </p>
            </div>
          </div>

          {/* Quick Profile Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
            {STUDENTS_DATA.map((student) => (
              <Link
                key={student.id}
                href={`/${student.slug}`}
                className="hover:text-yellow-400 transition-colors font-medium"
              >
                {student.name} Profile
              </Link>
            ))}
            <Link
              href="/#contact"
              className="hover:text-yellow-400 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} DEV.DUO. Built with Next.js, Spline 3D & TailwindCSS.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> by Heng Her & Sok Nilihong
          </p>
        </div>
      </div>
    </footer>
  );
}
