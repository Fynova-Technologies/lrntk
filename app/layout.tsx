"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Sidebar from "@/components/sidebar";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isToggleBarOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="">
          <Navbar togglebar={() => setIsOpen(!isToggleBarOpen)} />
        </div>
        {/* Sidebar & Main Content */}
        <div className="flex">
          {/* <Sidebar isOpen={isToggleBarOpen} /> */}
          <main className="md:ml-64 p-6 w-full mt-32">{children}</main>
        </div>
      </body>
    </html>
  );
}
