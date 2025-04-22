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
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['red', 'light', 'dark', 'darkpurple']}
          disableTransitionOnChange
        >
          {/* Navbar with fixed positioning */}
          <div className="h-screen w-full flex flex-col">
            <div className="Navbar">
              <Navbar
              togglebar={() => setIsOpen(!isToggleBarOpen)}/>
            </div>
            <div className="w-full">
            <div className="pt-32">
              {/* Sidebar (uncomment if needed) */}
              {/* <Sidebar isOpen={isToggleBarOpen} /> */}

              {/* Main content with responsive padding */}
              <main className="md:p-24 p-12 w-full ">
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
