"use client";

import { dashNavLinksList } from "@/lib/navlinks-list";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {dashNavLinksList.map((link) => (
        <div
          key={link.name}
          className={clsx(
            "text-sm flex justify-center items-start text-zinc-100 dark:text-zinc-800 hover:text-zinc-200 hover:font-bold dark:hover:text-zinc-900",
            {
              "text-zinc-200 font-bold dark:text-zinc-900":
                pathname === link.href,
            }
          )}
        >
          {link.icon ? (
            <>
              <Link target="_blank" href={link.href}>
                {link.name}
              </Link>
              <link.icon size={12} />
            </>
          ) : (
            <Link href={link.href}>{link.name}</Link>
          )}
        </div>
      ))}
    </>
  );
};

export default NavLinks;
