"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Sidebar from "@/components/sidebar";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider"
// import Sidebar from "@/components/sidebar";

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
    <html lang="en" suppressHydrationWarning>
     <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col bg-white text-black font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['red', 'light', 'dark', 'darkpurple']}
          disableTransitionOnChange
        >
          {/* Navbar with fixed positioning */}
          <div className="container">
            <div className="Navbar">
              <Navbar
              togglebar={() => setIsOpen(!isToggleBarOpen)}/>
            </div>
            <div className="content flex flex-col min-h-screen">
            <div className="pt-[height-of-navbar] flex flex-1">
              {/* Sidebar (uncomment if needed) */}
              {/* <Sidebar isOpen={isToggleBarOpen} /> */}
bo 
              {/* Main content with responsive padding */}
              <main className="p-6 w-full md:ml-64">
                {children}
              </main>
            </div>
          </div>

          </div>
          
          

          {/* Main Content with padding to account for Navbar height */}
          
        </ThemeProvider>
      </body>
    </html>
  );
}
