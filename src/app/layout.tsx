"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

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
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/ico"
          href="/rhb-icon.ico"
          sizes="96x96"
        />
        <link rel="shortcut icon" href="/rhb-icon.ico" />
        <meta name="apple-mobile-web-app-title" content="IPA Singapore" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className="antialiased w-dvw h-dvh flex flex-col overflow-x-hidden"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
