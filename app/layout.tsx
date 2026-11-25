import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionEffects } from "@/components/site-interactions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cleverworks.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Clever Works | Web Development & Digital Solutions", template: "%s | Clever Works" },
  description: "Clever Works creates modern websites, mobile apps, e-commerce platforms, and digital experiences to help businesses grow.",
  applicationName: "Clever Works",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: siteUrl, siteName: "Clever Works", title: "Clever Works | Web Development & Digital Solutions", description: "Building Ideas. Creating Impact. Thoughtful websites, apps, and digital experiences for ambitious businesses." },
  twitter: { card: "summary_large_image", title: "Clever Works | Web Development & Digital Solutions", description: "Thoughtful websites, apps, and digital experiences for ambitious businesses." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#102c36" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "Organization", name: "Clever Works", url: siteUrl, slogan: "Building Ideas. Creating Impact.", description: "Digital agency creating websites, mobile apps, e-commerce platforms, and digital experiences.", email: "cleverworksinfo@gmail.com", telephone: "+919566072823", knowsAbout: ["Web development", "Mobile app development", "UI/UX design", "E-commerce development"] };
  // Runs before first paint so a saved light theme never flashes dark on refresh.
  const themeScript = `try{var t=localStorage.getItem("clever-works-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />{children}<MotionEffects /></body></html>;
}
