"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "Checkout", href: "/checkout" },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx("text-sm hover:text-zinc-900 hover:font-bold dark:hover:text-zinc-200", {
            "text-zinc-900 font-bold dark:text-zinc-200": pathname === link.href,
          })}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
