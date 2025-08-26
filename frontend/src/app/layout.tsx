"use client";

import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
// import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body className="font-roboto overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <SessionProvider> */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
                style: {
                  background: "transparent",
                  boxShadow: "none",
                },
              }}
            />
            {children}
          {/* </SessionProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
