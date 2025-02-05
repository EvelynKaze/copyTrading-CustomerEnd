import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// const CLIENT_ID= "http://942805273358-1klclrgcp1p9tve92guir3vjgojqv326.apps.googleusercontent.com"

export const metadata: Metadata = {
  title: "CopyTradingMarkets",
  description: "Buy and Trade Stocks and the best Copytrade plans",
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
          {/*<GoogleOAuthProvider clientId={CLIENT_ID}>*/}
            <html lang="en">
              <body className={`antialiased`}>
                <main>{children}</main>
                <Toaster />
              </body>
            </html>
          {/*</GoogleOAuthProvider>*/}
        </AnimatePresence>
      </Providers>
    </ThemeProvider>
  );
}
