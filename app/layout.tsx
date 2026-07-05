import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ruturaj Ambure | AI & Machine Learning Engineer Portfolio",
  description: "Explore the premium portfolio of Ruturaj Ambure, a B.Tech Artificial Intelligence and Data Science student, AI Engineer, Full Stack Developer, and patent publisher. Discover 3D holographic interfaces, cancer simulation ML models, and secure data steganography products.",
  keywords: [
    "Ruturaj Ambure", "AI Engineer", "Machine Learning", "Deep Learning", 
    "Software Developer", "StegoVault", "TumorVerse", "KARTA AI", 
    "VIT Pune", "Portfolio", "React Three Fiber", "Next.js"
  ],
  authors: [{ name: "Ruturaj Ambure", url: "mailto:ruturajambure@gmail.com" }],
  openGraph: {
    title: "Ruturaj Ambure | AI & Machine Learning Engineer Portfolio",
    description: "Futuristic, premium 3D portfolio showcase of Ruturaj Ambure. Immersive web technologies, deep learning models, and full stack applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruturaj Ambure | AI & Machine Learning Engineer Portfolio",
    description: "Futuristic, premium 3D portfolio showcase of Ruturaj Ambure.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="bg-[#050816] text-white font-sans antialiased overflow-x-hidden min-h-screen">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
