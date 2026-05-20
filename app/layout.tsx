import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Configure local font
const nippo = localFont({
  src: [
    {
      path: '../fonts/Nippo-Regular.woff2',
      weight: '378', // Your custom regular weight mapping
      style: 'normal',
    },
    {
      path: '../fonts/Nippo-Light.woff2', // Adjust to your actual filename
      weight: '300', // Standard numeric mapping for ExtraLight
      style: 'normal',
    },
    {
      path: '../fonts/Nippo-Extralight.woff2', // Adjust to your actual filename
      weight: '200', // Standard numeric mapping for ExtraLight
      style: 'normal',
    }
  ],
  variable: '--font-nippo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ACWA",
  description: "This is the official ACWA home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nippo.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${nippo.className}`}>{children}</body>
    </html>
  );
}
