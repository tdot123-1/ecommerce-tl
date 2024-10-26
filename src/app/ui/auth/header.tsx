import Image from "next/image";
import { montserrat } from "../fonts";

import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-zinc-300 px-3 md:px-6 py-3 border-b border-zinc-500 dark:bg-zinc-900 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center gap-1 md:gap-5">
        <div className="w-10">
          <Link href="/dashboard">
            <Image src="/logo3.png" alt="Logo" width={214} height={264} />
          </Link>
        </div>
        <h1
          className={`${montserrat.className} text-xl md:text-3xl font-semibold`}
        >
          Authentication
        </h1>
      </div>
    </header>
  );
};

export default Header;
