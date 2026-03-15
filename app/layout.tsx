import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brian Machayo | Systems & Security Engineer",
  description: "Portfolio of Brian Machayo — TypeScript, React, Java, Python, Ethical Hacking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}