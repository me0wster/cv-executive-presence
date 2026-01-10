// JSON-LD Structured Data for SEO
// Schema.org Person type for rich search results

export interface PersonStructuredData {
  "@context": "https://schema.org";
  "@type": "Person";

  /** Full name */
  name: string;

  /** Current job title */
  jobTitle: string;

  /** Professional bio/description */
  description: string;

  /** Portfolio URL */
  url: string;

  /** Profile image URL */
  image?: string;

  /** Email address */
  email?: string;

  /** Social profile URLs */
  sameAs: string[];

  /** Current employer */
  worksFor?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };

  /** Skills and expertise */
  knowsAbout: string[];

  /** Location */
  address?: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  };
}

// Person structured data constant
export const personStructuredData: PersonStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Timothy Chin",
  jobTitle: "Staff Engineer | Technical Leader",
  description:
    "Engineering leader with 12+ years of experience across DevOps, platform engineering, and developer experience. Specializing in AI-powered platforms and cross-functional team leadership.",
  url: "https://timothychinkl.dev",
  image: "https://timothychinkl.dev/og-image.jpg",
  sameAs: [
    "https://linkedin.com/in/timothychinkl",
    "https://github.com/timothychinkl",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Venue.sh",
  },
  knowsAbout: [
    "DevOps",
    "Platform Engineering",
    "Developer Experience",
    "Kubernetes",
    "AI/ML",
    "TypeScript",
    "React",
    "Cloud Architecture",
    "Next.js",
    "Backstage",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressCountry: "US",
  },
};

/**
 * Generate JSON-LD script content for Person schema
 * @returns JSON string ready for inline script tag
 */
export function generatePersonJsonLd(): string {
  return JSON.stringify(personStructuredData, null, 2);
}
