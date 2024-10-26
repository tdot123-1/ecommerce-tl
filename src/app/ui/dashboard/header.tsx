import { Button } from "@/components/ui/button";
import ThemeButton from "../theme-button";
import Image from "next/image";
import { montserrat } from "../fonts";
import { LogOutIcon } from "lucide-react";
import { signOut } from "../../../auth";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-zinc-300 px-3 md:px-6 py-3 border-b border-zinc-500 dark:bg-zinc-900 backdrop-blur-md bg-opacity-80">
      <div className="flex justify-between">
        <div className="flex items-center gap-1 md:gap-5">
          <div className="w-10">
            <Image src="/logo3.png" alt="Logo" width={214} height={264} />
          </div>
          <h1
            className={`${montserrat.className} text-xl md:text-3xl font-semibold`}
          >
            Dashboard
          </h1>
        </div>
        <div className="flex justify-center items-center gap-1">
          <ThemeButton />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="p-2" variant="outline">
              <LogOutIcon size={24} />
              <div className="hidden">Logout</div>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
