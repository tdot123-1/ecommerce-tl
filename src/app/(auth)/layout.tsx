import { roboto } from "../ui/fonts";
import "../globals.css";
import Header from "../ui/auth/header";
import { Metadata } from "next";

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
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        <main className="px-3">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
