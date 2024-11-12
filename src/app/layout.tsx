import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import QueryProviders from "./components/Provider";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BitcoinHack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} text-white`}>
        <QueryProviders>{children}</QueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
