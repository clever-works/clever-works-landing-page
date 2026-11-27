import type { Metadata, Viewport } from "next";
import { Amiri, DM_Mono, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MotionEffects } from "@/components/interactions/motion-effects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cleverworks.co";

// Fonts are self-hosted by next/font at build time, so there is no render-blocking request to Google Fonts.
// The CSS variables feed --sans / --mono / --display (and the Bismillah line) in globals.css.
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm-sans" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-dm-mono" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-space-grotesk" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], display: "swap", preload: false, variable: "--font-amiri" });
const fontVariables = [dmSans.variable, dmMono.variable, spaceGrotesk.variable, amiri.variable].join(" ");

const title = "Clever Works | Web Development & Digital Solutions";
const description = "Clever Works creates modern websites, mobile apps, e-commerce platforms, and digital experiences to help businesses grow.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Clever Works" },
  description,
  applicationName: "Clever Works",
  keywords: ["web development", "website design", "mobile app development", "UI/UX design", "e-commerce development", "custom web applications", "website redesign", "digital agency"],
  authors: [{ name: "Clever Works", url: siteUrl }],
  creator: "Clever Works",
  publisher: "Clever Works",
  category: "technology",
  formatDetection: { telephone: true, email: true, address: false },
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: siteUrl, siteName: "Clever Works", title, description: "Building Ideas. Creating Impact. Thoughtful websites, apps, and digital experiences for ambitious businesses." },
  twitter: { card: "summary_large_image", title, description: "Thoughtful websites, apps, and digital experiences for ambitious businesses." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#102c36" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Clever Works",
        url: siteUrl,
        logo: `${siteUrl}/clever-works-icon.png`,
        image: `${siteUrl}/opengraph-image`,
        slogan: "Building Ideas. Creating Impact.",
        description: "Digital agency creating websites, mobile apps, e-commerce platforms, and digital experiences.",
        email: "cleverworksinfo@gmail.com",
        telephone: "+919566072823",
        contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "cleverworksinfo@gmail.com", telephone: "+919566072823", availableLanguage: ["English"] },
        knowsAbout: ["Web development", "Mobile app development", "UI/UX design", "E-commerce development", "Custom web applications", "Website redesign and maintenance"],
      },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "Clever Works", inLanguage: "en", publisher: { "@id": `${siteUrl}/#organization` } },
    ],
  };
  // Runs before first paint so a saved light theme never flashes dark on refresh.
  const themeScript = `try{var t=localStorage.getItem("clever-works-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;
  return <html lang="en" className={fontVariables} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />{children}<MotionEffects /></body></html>;
}
