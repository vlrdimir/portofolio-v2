import type { Metadata } from "next";
import "@/styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

import { Geist, Geist_Mono, Merriweather } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dwi | Portfolio",
  description: "Personal portfolio and blog of Dwi",
};

import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} bg-background text-foreground selection:bg-primary selection:text-primary-foreground antialiased`}
      >
        <LanguageProvider>
          <div className="bg-background fixed inset-0 -z-10 h-full w-full [background-image:radial-gradient(#d4c4b5_1px,transparent_1px)] [background-size:20px_20px] opacity-100 dark:[background-image:radial-gradient(#4a4036_1px,transparent_1px)]"></div>
          <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full [background-image:url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-5 mix-blend-multiply"></div>
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8 font-sans md:py-12">
            <Header />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <footer className="mt-24 text-sm text-neutral-400">
              <p>© {new Date().getFullYear()} Dwi. All rights reserved.</p>
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
