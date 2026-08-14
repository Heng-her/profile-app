import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SplineBackground } from "@/components/spline";
import { constructMetadata } from "@/seo/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata();

const splineUrl = {
  bg: {
    link: "https://prod.spline.design/pHhfYHb7Jubvz4Tu/scene.splinecode",
    code: "pHhfYHb7Jubvz4Tu",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-black text-white">
        {/* Global 3D Background */}
        <SplineBackground
          url={splineUrl.bg.link}
          cacheKey={splineUrl.bg.code}
        />

        {/* Main Content Layer (allows mouse events to pass through to 3D Spline canvas) */}
        <div className="relative z-20 flex-1 flex flex-col pointer-events-none">
          {children}
        </div>
      </body>
    </html>
  );
}
