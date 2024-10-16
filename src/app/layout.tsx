import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "./ui/fonts";
import Navbar from "./ui/customer/navbar/navbar";
import { ThemeProvider } from "./ui/theme-provider";
import CartProviderWrapper from "./ui/cart-provider";
import Footer from "./ui/customer/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "App Name",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <CartProviderWrapper>
          <ThemeProvider
            attribute="class"
            enableSystem
            defaultTheme="system"
            disableTransitionOnChange
          >
            <Navbar />
            <main className="px-3 min-h-[calc(100vh-80px)]">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </CartProviderWrapper>
      </body>
    </html>
  );
}
