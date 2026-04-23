import type { Metadata } from "next";
import { DM_Sans, Fraunces, Shrikhand } from "next/font/google";
import { Toaster } from "sonner";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shrikhand",
  display: "swap",
});

const metadataBase = getMetadataBase();

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  title: {
    default: "Hippy Chick Life — Lifestyle & UGC Portfolio",
    template: "%s — Hippy Chick Life",
  },
  description:
    "Wise Enough to Know Better, Bold Enough to Begin Again. Premium UGC, lifestyle content, and brand storytelling for mature creators.",
  openGraph: {
    title: "Hippy Chick Life",
    description:
      "Warm, editorial lifestyle brand and portfolio for mature UGC creators.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hippy Chick Life",
    description:
      "Warm, editorial lifestyle brand and portfolio for mature UGC creators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${shrikhand.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
