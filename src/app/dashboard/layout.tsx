import { roboto } from "../ui/fonts";
import ThemeButton from "../ui/theme-button";
import { ThemeProvider } from "../ui/theme-provider";
import "../globals.css";

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
          <div>
            <ThemeButton />
          </div>
          <main className="h-screen justify-center mx-5">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
