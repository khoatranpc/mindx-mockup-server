'use client';
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import '@ant-design/v5-patch-for-react-19';
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <AntdRegistry>
          <main className="p-[2.4rem]">
            <div className="flex justify-center">
              <Link href={'/'}><Image alt="logo" src="/logo.png" width={200} height={100} /></Link>
            </div>
            {children}
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}
