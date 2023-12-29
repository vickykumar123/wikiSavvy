import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ModalProvider } from "@/components/ModalProvider";
import ToastProvider from "@/components/ToastProvider";
import { CrispProvider } from "@/components/CrispProvider";

export const metadata: Metadata = {
  title: "Wiki Savvy",
  description: "A SaaS application built with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CrispProvider />
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
