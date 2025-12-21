import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { JobProvider } from "@/context/JobContext";
import { NotificationProvider } from "@/context/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobPortal | Premium Job Search Platform",
  description: "A modern, high-performance job board built with Next.js 15, Tailwind CSS, and Framer Motion. Discover your next career move with JobPortal.",
  keywords: ["job board", "tech careers", "frontend developer", "next.js", "portfolio", "hiring"],
  authors: [{ name: "JobPortal Team" }],
  openGraph: {
    title: "JobPortal | Find Your Dream Job",
    description: "The #1 platform for tech and creative professionals to find their next challenge.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <JobProvider>
                <Header />
                <main className="flex-1 w-full">
                  {children}
                </main>
                <Footer />
              </JobProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
