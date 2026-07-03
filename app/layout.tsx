import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
