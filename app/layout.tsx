import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terminal Resume | Timothy Chin",
  description: "Interactive terminal-style resume - Timothy Chin",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
