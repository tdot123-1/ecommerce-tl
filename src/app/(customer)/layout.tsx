import type { Metadata } from "next";
import "../globals.css";
import { roboto } from "../ui/fonts";
import Navbar from "../ui/customer/navbar/navbar";
import { ThemeProvider } from "../ui/theme-provider";
import CartProviderWrapper from "../ui/cart-provider";
import Footer from "../ui/customer/footer";
import { Toaster } from "@/components/ui/toaster";
import SignupForm from "../ui/customer/mailing/signup-form";
import VerifyCustomer from "../ui/customer/mailing/verify-customer";

export const metadata: Metadata = {
  title: {
    template: "%s | Ti'El Shopping",
    default: "Ti'El Shopping",
  },
  description: "The easy shopping platform.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
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
            <SignupForm />
            <VerifyCustomer />
            <Footer />
            <Toaster />
          </ThemeProvider>
        </CartProviderWrapper>
      </body>
    </html>
  );
}
