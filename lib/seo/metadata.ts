// SEO Metadata Configuration for CV-TUI
// Following "Content as Code" constitutional principle

export interface SiteMetadata {
  /** Page title displayed in browser tab and search results */
  title: string;

  /** Meta description (150-160 chars) for search result snippets */
  description: string;

  /** Canonical URL for the site */
  url: string;

  /** Site name for Open Graph */
  siteName: string;

  /** Language code (BCP 47 format) */
  locale: string;

  /** Content type for Open Graph */
  type: "website" | "profile";
}

export interface OpenGraphImage {
  /** Image URL (absolute) */
  url: string;

  /** Image width in pixels */
  width: number;

  /** Image height in pixels */
  height: number;

  /** Alt text for accessibility */
  alt: string;

  /** MIME type */
  type: "image/png" | "image/jpeg";
}

export interface OpenGraphMetadata {
  /** Title for social preview (can differ from page title) */
  title: string;

  /** Description for social preview */
  description: string;

  /** Canonical URL */
  url: string;

  /** Site name */
  siteName: string;

  /** Content type */
  type: "profile" | "website";

  /** Locale */
  locale: string;

  /** Preview image configuration */
  images: OpenGraphImage[];
}

export interface TwitterMetadata {
  /** Card type */
  card: "summary" | "summary_large_image";

  /** Title for Twitter card */
  title: string;

  /** Description for Twitter card */
  description: string;

  /** Twitter handle (optional) */
  creator?: string;

  /** Image URL */
  images: string[];
}

// Core site metadata
export const siteMetadata: SiteMetadata = {
  title: "Timothy Chin | Staff Engineer & Technical Leader",
  description:
    "Engineering leader with 12+ years in DevOps, platform engineering, and developer experience. Architecting AI-powered platforms and leading cross-functional teams.",
  url: "https://timothychinkl.dev",
  siteName: "Timothy Chin",
  locale: "en_US",
  type: "profile",
};

// Open Graph metadata for social sharing
export const openGraphMetadata: OpenGraphMetadata = {
  title: "Timothy Chin | Staff Engineer & Technical Leader",
  description:
    "Engineering leader with 12+ years in DevOps, platform engineering, and developer experience.",
  url: "https://timothychinkl.dev",
  siteName: "Timothy Chin",
  type: "profile",
  locale: "en_US",
  images: [
    {
      url: "https://timothychinkl.dev/og-image.jpg",
      width: 3024,
      height: 4032,
      alt: "Timothy Chin - Staff Engineer & Technical Leader",
      type: "image/jpeg",
    },
  ],
};

// Twitter Card metadata
export const twitterMetadata: TwitterMetadata = {
  card: "summary_large_image",
  title: "Timothy Chin | Staff Engineer & Technical Leader",
  description:
    "Engineering leader with 12+ years in DevOps, platform engineering, and developer experience.",
  images: ["https://timothychinkl.dev/og-image.jpg"],
};
