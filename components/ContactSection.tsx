"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  PhoneCall,
  MessageSquare,
  Globe2,
  Building2,
} from "lucide-react";
import { STUDENTS_DATA } from "@/data/students";

export function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    recipient: "all",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", recipient: "all", message: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Us Today</span>
          </h2>
          <p className="text-sm md:text-base text-slate-300">
            Have a project idea, mobile app collaboration, or UI/UX design inquiry? Send a message directly to Heng Her or Lika Nea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form & Recommendations */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Form */}
            <div className="rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Send a Direct Message
              </h3>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex flex-col items-center text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  <h4 className="text-lg font-bold">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out. Heng Her and Lika Nea will get back to you shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sok Chan"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Recipient *</label>
                    <select
                      value={formData.recipient}
                      onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="all" className="bg-slate-900">Both (Heng Her & Lika Nea)</option>
                      <option value="heng-her" className="bg-slate-900">Heng Her (Mobile & Full-Stack)</option>
                      <option value="lika-nea" className="bg-slate-900">Lika Nea (UI/UX & Frontend)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your project details or inquiry here..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Recommendations / Best Practices Box */}
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 space-y-2 text-xs md:text-sm text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <Lightbulb className="w-4 h-4 shrink-0" />
                <span>Recommendations for Contacting Us</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-slate-300 text-xs">
                <li>
                  <strong className="text-amber-300">Instant Chat:</strong> For quick responses regarding mobile apps or web design, message us on <a href="https://t.me/heng_her" target="_blank" rel="noreferrer" className="underline text-cyan-400">Telegram (@heng_her)</a>.
                </li>
                <li>
                  <strong className="text-amber-300">Project Proposals:</strong> Include your scope, tech stack requirements, and deadline for faster estimate.
                </li>
                <li>
                  <strong className="text-amber-300">On-Campus Meetups:</strong> Find us at RUPP FE or ITC campus during technology hackathons and lab sessions.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Location & Direct Student Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Map & Details */}
            <div className="rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-400" />
                  Location & Campus
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/10 text-cyan-300">
                  Phnom Penh, KH
                </span>
              </div>

              {/* Location Card Info */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Heng Her Location:</span>
                    <p className="text-slate-400">RUPP Campus 1, Russian Blvd, Khan Tuol Kork, Phnom Penh</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                  <Building2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Lika Nea Location:</span>
                    <p className="text-slate-400">ITC Campus, Russian Blvd, Khan Sen Sok, Phnom Penh</p>
                  </div>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative">
                <iframe
                  title="Phnom Penh University Campus Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7744318047515!2d104.88785467571343!3d11.568019944062637!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e11894d!2sRoyal%20University%20of%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Quick Contact Cards for Both Students */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Direct Contacts
              </h4>

              {STUDENTS_DATA.map((student) => (
                <div
                  key={student.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-all"
                >
                  <div>
                    <div className="font-semibold text-sm text-white">
                      {student.name}
                    </div>
                    <div className="text-xs text-slate-400">{student.role}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${student.socials.email}`}
                      title="Send Email"
                      className="p-2 rounded-xl bg-white/10 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={student.socials.telegram}
                      target="_blank"
                      rel="noreferrer"
                      title="Telegram Chat"
                      className="p-2 rounded-xl bg-white/10 hover:bg-blue-500/20 text-slate-200 hover:text-blue-300 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${student.socials.phone}`}
                      title="Call Phone"
                      className="p-2 rounded-xl bg-white/10 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-300 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
