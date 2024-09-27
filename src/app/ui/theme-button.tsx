"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("MOUNT")
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button>Loading</Button>;
  } 

  if (resolvedTheme === "light") {
    return <Button onClick={() => setTheme("dark")}>Dark</Button>
  }

  if (resolvedTheme === "dark") {
    return <Button onClick={() => setTheme("light")}>Light</Button>
  }


};

export default ThemeButton;
