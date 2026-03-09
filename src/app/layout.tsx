import type { Metadata } from "next";
import { Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jast-ingkon.vercel.app"),
  title: "Jastine & Leonard | Wedding",
  description: "Join us for our special day.",
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    title: "Jastine & Leonard | Wedding",
    description: "Join us for our special day on April 11, 2026.",
    url: "https://jast-ingkon.vercel.app",
    siteName: "Jastine & Leronard Wedding",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jastine & Leonard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${playfair.variable} antialiased font-serif`}
      >
        {children}
      </body>
    </html>
  );
}
