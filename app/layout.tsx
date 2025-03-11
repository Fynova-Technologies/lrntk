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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={['red','light','dark',"darkpurple"]}
            disableTransitionOnChange
        >
            <Navbar togglebar={() => setIsOpen(!isToggleBarOpen)} />

            {/* Sidebar & Main Content */}
            <div className="flex">
              {/* <Sidebar isOpen={isToggleBarOpen} /> */}
              
              <main className="md:ml-64 p-6 w-full mt-32"> {children}</main>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
