import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.className} scroll-smooth`} suppressHydrationWarning>
      <body className="font-roboto overflow-x-hidden " suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
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
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
