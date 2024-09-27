import Image from "next/image";
import NavLinks from "./nav-links";
import ThemeButton from "../theme-button";
import Link from "next/link";
import Basket from "./basket";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-zinc-300 flex justify-between items-center px-5 py-3 border-b border-zinc-500 dark:bg-zinc-900">
      <div className="w-10">
        <Link href="/">
          <Image src="/logo3.png" alt="Logo" width={214} height={264} />
        </Link>
      </div>
      <div className="flex justify-evenly items-baseline w-60 text-zinc-600 dark:text-zinc-400">
        <NavLinks />
      </div>
      <div className="flex justify-center gap-1 items-center">
      <ThemeButton />
      <Basket />
      </div>
    </nav>
  );
};

export default Navbar;
