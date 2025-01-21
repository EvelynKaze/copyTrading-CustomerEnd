import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CopyTradeMarkets",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <Providers>
        <AnimatePresence>
          <html lang="en">
            <body className={`antialiased`}>
              <main>{children}</main>
              <Toaster />
            </body>
          </html>
        </AnimatePresence>
      </Providers>
    </ThemeProvider>
  );
}
