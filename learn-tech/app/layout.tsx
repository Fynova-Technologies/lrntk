'use client'

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
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

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isToogleBarOpen, setIsOpen] = useState(false);

  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <Navbar tooglebar={()=>setIsOpen(!isToogleBarOpen)}/>

        {/* Sidebar & Main Content */}
        <div className="flex">
          <Sidebar isOpen={isToogleBarOpen} />
          <main className="md:ml-64 p-6 w-full mt-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
