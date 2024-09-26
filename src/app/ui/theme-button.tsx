"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const ThemeButton = () => {
  const { setTheme, theme } = useTheme();

  console.log(theme)

  const changeTheme = (currentTheme: string | undefined) => {
    currentTheme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div>
      <Button onClick={() => changeTheme(theme)}>Theme</Button>
    </div>
  );
};

export default ThemeButton;
