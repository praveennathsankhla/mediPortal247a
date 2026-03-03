import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mediportal247 India - Your Trusted Healthcare Information Source",
  description: "Find verified information on top hospitals in India, medical awareness blogs, and healthcare facilities at mediportal247.online. SEO-optimized and trustworthy medical portal.",
  keywords: "India hospitals, medical blog, healthcare information, top hospitals India, NABH hospitals, mediportal247",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
