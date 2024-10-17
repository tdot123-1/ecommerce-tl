import { Button } from "@/components/ui/button";
import ThemeButton from "../theme-button";
import Image from "next/image";
import { montserrat } from "../fonts";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-zinc-300 px-5 py-3 border-b border-zinc-500 dark:bg-zinc-900 backdrop-blur-md bg-opacity-80">
      <div className="flex justify-between">
        <div className="flex items-baseline gap-5">
          <div className="w-10">
            <Image src="/logo3.png" alt="Logo" width={214} height={264} />
          </div>
          <h1 className={`${montserrat.className} text-3xl font-bold`}>
            Dashboard
          </h1>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Button>Logout</Button>
          <ThemeButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
