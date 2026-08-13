"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STUDENTS_DATA } from "@/data/students";
import { Code2, Users, Mail, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/40 border-b border-white/10 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-white font-bold text-lg tracking-wider group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-black/80 backdrop-blur-md rounded-[11px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              DEV.DUO
            </span>
            <span className="text-[10px] text-cyan-400/80 font-mono font-medium tracking-widest uppercase">
              Portfolio Showcase
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Home Showcase
          </Link>

          {/* Student Profile Quick Links */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
            {STUDENTS_DATA.map((student) => (
              <Link
                key={student.id}
                href={`/${student.slug}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full text-slate-200 hover:text-white hover:bg-cyan-500/20 transition-all flex items-center gap-2 group"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
                {student.name}
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            className="text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
          >
            Home Showcase
          </Link>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider pt-2">
            Student Profiles
          </div>
          {STUDENTS_DATA.map((student) => (
            <Link
              key={student.id}
              href={`/${student.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-white pl-3 py-1.5 border-l-2 border-cyan-500/50 hover:border-cyan-400"
            >
              {student.name} ({student.khmerName})
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white mt-4"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
