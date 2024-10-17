import { roboto } from "../ui/fonts";
import { ThemeProvider } from "../ui/theme-provider";
import "../globals.css";
import Header from "../ui/dashboard/header";

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
          <main className="h-screen justify-center mx-5">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
