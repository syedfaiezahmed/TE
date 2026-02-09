import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import LayoutWrapper from "./components/LayoutWrapper";
import ChatWidget from "./components/ChatWidget";
import DivisionModal from "./components/DivisionModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trans Emirates",
  description: "Trusted Trading Partner in Saudi Arabia",
};

// Fetch content for layout (Footer, etc)
async function getContent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    const res = await fetch(`${apiUrl}/content`, { 
      cache: 'no-store', 
      signal: controller.signal
    }).catch(() => null);
    
    clearTimeout(timeoutId);

    if (!res || !res.ok) throw new Error('Failed');
    return res.json();
  } catch (error) {
    return {};
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const cookieStore = await cookies();
  const hasSelected = cookieStore.has('divisionSelected');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DivisionModal shouldShow={!hasSelected} />
        <LayoutWrapper content={content}>
          {children}
        </LayoutWrapper>
        <ChatWidget />
      </body>
    </html>
  );
}
