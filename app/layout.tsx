import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The 32nd MATHirang MATHibay Merch Order Form",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>

      <body className={inter.className}>
      <Image src="/logo.png" width="400" alt="" />
      <p style={{fontSize:35}}> <b> The 32nd MATHirang MATHibay Merch Order Form </b> </p> 

        {children}
    
      </body>
    </html>
  );
}
