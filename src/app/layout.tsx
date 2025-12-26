import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "anuragambuj.dev | Software Engineering Expert",
  description: "Portfolio of Anurag Ambuj - Software Engineering Expert with 10 years of experience in Java, Go, Rust & Zig.",
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SceneryBackground from "@/components/visuals/SceneryBackground";

// ... (imports)

import { Analytics } from "@vercel/analytics/react";

// ... (imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SceneryBackground />
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 200px)", paddingTop: "140px" }}>
            {children}
          </main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
