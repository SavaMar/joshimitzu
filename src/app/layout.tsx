import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AdminStoreProvider } from "@/lib/admin-store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AdminStoreProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </AdminStoreProvider>
      </body>
    </html>
  );
}
