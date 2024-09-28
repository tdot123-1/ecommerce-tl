"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "Checkout", href: "/checkout" },
];

const NavbarMobile = () => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="md:hidden p-2">
          <MenuIcon size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {links.map((link) => (
          <DropdownMenuItem
            key={link.name}
            className={clsx(
              "text-sm hover:text-zinc-900 hover:font-bold dark:hover:text-zinc-200",
              {
                "text-zinc-900 font-bold bg-zinc-200 dark:bg-zinc-800  dark:text-zinc-200":
                  pathname === link.href,
              }
            )}
          >
            <Link href={link.href}>{link.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarMobile;
