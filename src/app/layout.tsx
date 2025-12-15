import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
