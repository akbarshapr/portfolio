import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getPortfolio } from "@/lib/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The page <title> and description come from the same data as the page.
export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolio();
  return {
    title: `${data.name} — ${data.title}`,
    description: data.intro,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
