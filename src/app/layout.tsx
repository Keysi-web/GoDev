import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CookieConsent } from "@/components/ui/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "GoDev",
  description: "Modern Next.js scaffold optimized for AI-powered development with GoDev. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "GoDev_Team" }],
  icons: {
    icon: "G_logo.png",
  },
  openGraph: {
    title: "GoDev Code Scaffold",
    description: "AI-powered development with modern React stack",
    url: "https://go.dev",
    siteName: "GoDev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoDev Code Scaffold",
    description: "AI-powered development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <CookieConsent />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}


