"use client";

import clsx from "clsx";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Overview",
    href: "/dashboard/products",
  },
  {
    name: "Create",
    href: "/dashboard/products/create",
  },
  {
    name: "Shop",
    href: "/",
    icon: <ExternalLinkIcon size={12} />,
  },
  {
    name: "Stripe",
    href: "https://dashboard.stripe.com/test/dashboard",
    icon: <ExternalLinkIcon size={12} />,
  },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
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
            <Link target="_blank" href={link.href}>
              {link.name}
            </Link>
          ) : (
            <Link href={link.href}>{link.name}</Link>
          )}

          {link.icon}
        </div>
      ))}
    </>
  );
};

export default NavLinks;
