import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LocaleProvider } from "../components/LocaleProvider/LocaleProvider";
import { AuthProvider } from "../components/AuthProvider/AuthProvider";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Travellian — Explore the world",
  description: "Handpicked destinations, trip inspiration, and memorable journeys.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><LocaleProvider><AuthProvider>{children}</AuthProvider></LocaleProvider></body>
    </html>
  );
}
