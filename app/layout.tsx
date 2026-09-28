import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { getPortfolio } from "@/lib/portfolio";
import "./globals.css";

// Each font exposes a CSS variable that app/globals.css maps to a Tailwind
// font utility: font-sans (DM Sans) and font-mono (JetBrains Mono).
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
      className={`${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-body">
        {children}
      </body>
    </html>
  );
}
