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
  title: "Jastine & Leronard | Wedding",
  description: "Join us for our special day.",
  icons: {
    icon: "/wedding-shoot/644231006_759220623655508_5739970447042265428_n.jpg",
    apple: "/wedding-shoot/644231006_759220623655508_5739970447042265428_n.jpg",
  },
  openGraph: {
    title: "Jastine & Leronard | Wedding",
    description: "Join us for our special day on April 11, 2026.",
    url: "https://jast-ingkon.vercel.app", // Assuming a placeholder URL, will work if deployed
    siteName: "Jastine & Leronard Wedding",
    images: [
      {
        url: "/wedding-shoot/644231006_759220623655508_5739970447042265428_n.jpg",
        width: 1200,
        height: 630,
        alt: "Jastine & Leronard",
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
