"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // console.log("MOUNT");
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className="p-2" variant="ghost">
        <p className="hidden">Toggle theme</p>
        <SunMoonIcon size={24} />
      </Button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <Button className="p-2" variant="ghost" onClick={() => setTheme("dark")}>
        <p className="hidden">Toggle theme</p>
        <MoonIcon size={24} />
      </Button>
    );
  }

  if (resolvedTheme === "dark") {
    return (
      <Button className="p-2" variant="ghost" onClick={() => setTheme("light")}>
        <p className="hidden">Toggle theme</p>
        <SunIcon size={24} />
      </Button>
    );
  }
};

export default ThemeButton;
