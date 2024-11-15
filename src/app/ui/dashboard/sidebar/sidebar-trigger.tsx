"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";

const CustomSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button onClick={toggleSidebar} variant={`default`} className="p-2 absolute left-1 my-0.5 bg-zinc-800 dark:bg-zinc-200">
      <p className="hidden">Toggle Sidebar</p>
      {open ? <SidebarCloseIcon size={24} /> : <SidebarOpenIcon size={24} />}
    </Button>
  );
};

export default CustomSidebarTrigger;
