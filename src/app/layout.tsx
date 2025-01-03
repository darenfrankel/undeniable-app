// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics-script";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undeniable",
  description: "Appeal denied healthcare claims with our quick, easy, free, and privates email template and generator.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <Analytics />
        </div>
      </body>
    </html>
  );
}