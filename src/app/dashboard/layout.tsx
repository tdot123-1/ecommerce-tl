import { roboto } from "../ui/fonts";
import { ThemeProvider } from "../ui/theme-provider";
import "../globals.css";
import Header from "../ui/dashboard/header";
import Navbar from "../ui/dashboard/navbar/navbar";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: "%s | Ti'El Shopping",
    default: "Ti'El Shopping",
  },
  description: "The easy shopping platform.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <Header />
          <Navbar />
          <main className="min-h-[calc(100vh-80px)] mx-5">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
