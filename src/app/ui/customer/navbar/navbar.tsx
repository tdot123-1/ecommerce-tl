import Image from "next/image";
import NavLinks from "./nav-links";
import ThemeButton from "../../theme-button";
import Link from "next/link";
import Basket from "../basket/basket";
import NavbarMobile from "./navbar-mobile";
import { User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-zinc-300 flex justify-between items-center px-5 py-3 border-b border-zinc-500 dark:bg-zinc-900 backdrop-blur-md bg-opacity-80">
      <div className="w-10 dark:hidden">
        <Link href="/">
          <Image src="/logo3.png" alt="Logo" width={214} height={264} />
        </Link>
      </div>
      <div className="w-10 hidden dark:block">
        <Link href="/">
          <Image src="/logo3-w.png" alt="Logo" width={214} height={264} />
        </Link>
      </div>
      <div className="hidden md:flex justify-evenly items-baseline w-60 text-zinc-600 dark:text-zinc-400">
        <NavLinks />
      </div>
      <div className="flex justify-evenly gap-1 items-center">
        <NavbarMobile />
        
        <Link href={`/profile`}>
          <Button variant="ghost" className="p-2">
            <User2Icon size={24} />
          </Button>
        </Link>

        <ThemeButton />
        <Basket />
      </div>
    </nav>
  );
};

export default Navbar;
