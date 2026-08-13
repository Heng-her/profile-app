import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SplineBackground } from "@/components/spline";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profile App",
  description: "Interactive 3D Profile Application",
};

const splineUrl = {
  bg: {
    link: "https://prod.spline.design/OZIFEJyygtHz0WqQ/scene.splinecode",
    code: "OZIFEJyygtHz0WqQ",
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

        {/* Main Content Layer */}
        <div className="relative z-20 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
