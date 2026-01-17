import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import type React from "react";

import { PHProvider } from "./providers";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";

import "./globals.css";

// Serif font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Sans-serif font for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://timothychin.com"),
  title: "Timothy Chin | Software Engineer",
  description:
    "Senior Software Engineer specializing in building elegant solutions to complex problems. Expert in React, TypeScript, Node.js, and cloud architecture.",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://timothychin.com",
  },
  openGraph: {
    title: "Timothy Chin | Software Engineer",
    description:
      "Senior Software Engineer specializing in building elegant solutions to complex problems.",
    url: "https://timothychin.com",
    siteName: "Timothy Chin",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Timothy Chin - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timothy Chin | Software Engineer",
    description:
      "Senior Software Engineer specializing in building elegant solutions to complex problems.",
    images: ["/og-image.png"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f7f4" }, // Warm cream
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" }, // Dark charcoal
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <PHProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PHProvider>
      </body>
    </html>
  );
}
