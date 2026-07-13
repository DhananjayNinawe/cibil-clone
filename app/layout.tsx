import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

// cibil.com ships Intro at 300/400/700 only — there is no 600 face, so
// `font-semibold` intentionally resolves to Bold, as it does on the real site.
const intro = localFont({
  src: [
    { path: "./fonts/Intro-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Intro-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Intro-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Intro-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-intro",
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "CIBIL - Monitor Your Credit Profile",
  description: "Join millions who monitor their credit profile with CIBIL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={intro.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
