import Image from "next/image";
import NavLinks from "./nav-links";

const Navbar = () => {
  return (
    <nav className="bg-zinc-300 flex justify-between items-center px-5 py-3 border-b border-zinc-500 dark:bg-zinc-900">
      <div className="w-10">
        <Image src="/logo3.png" alt="Logo" width={214} height={264} />
      </div>
      <div className="flex justify-evenly items-baseline w-60 text-zinc-600 dark:text-zinc-400">
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
