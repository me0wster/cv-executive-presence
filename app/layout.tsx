import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import type React from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { siteMetadata, openGraphMetadata, twitterMetadata } from "@/lib/seo/metadata";
import { generatePersonJsonLd } from "@/lib/seo/structured-data";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: siteMetadata.url,
  },
  openGraph: {
    title: openGraphMetadata.title,
    description: openGraphMetadata.description,
    url: openGraphMetadata.url,
    siteName: openGraphMetadata.siteName,
    type: openGraphMetadata.type,
    locale: openGraphMetadata.locale,
    images: openGraphMetadata.images.map(img => ({
      url: img.url,
      width: img.width,
      height: img.height,
      alt: img.alt,
      type: img.type,
    })),
  },
  twitter: {
    card: twitterMetadata.card,
    title: twitterMetadata.title,
    description: twitterMetadata.description,
    images: twitterMetadata.images,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eff1f5' }, // Catppuccin Latte
    { media: '(prefers-color-scheme: dark)', color: '#1e1e2e' },  // Catppuccin Mocha
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generatePersonJsonLd();
  
  return (
    <html lang="en" data-theme="mocha">
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body className="font-mono antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
