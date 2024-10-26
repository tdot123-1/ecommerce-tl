import { roboto } from "../ui/fonts";
import "../globals.css";
import Header from "../ui/auth/header";

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
