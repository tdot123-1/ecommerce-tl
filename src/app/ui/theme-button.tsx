"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("MOUNT");
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className="p-2">
        <SunMoonIcon size={24} />
      </Button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <Button className="p-2" onClick={() => setTheme("dark")}>
        <MoonIcon size={24} />
      </Button>
    );
  }

  if (resolvedTheme === "dark") {
    return (
      <Button className="p-2" onClick={() => setTheme("light")}>
        <SunIcon size={24} />
      </Button>
    );
  }
};

export default ThemeButton;
