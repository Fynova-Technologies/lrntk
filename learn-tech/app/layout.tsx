/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="w-full h-12 bg-gray-800 text-white flex justify-between items-center px-6 fixed top-0 left-0 z-50">
          <h1 className="text-lg font-bold">Website</h1>
          <div className="space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </nav>

        {/* Sidebar & Main Content */}
        <div className="flex">
          <Sidebar />
          <main className="ml-64 p-6 w-full mt-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
