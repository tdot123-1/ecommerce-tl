import { ExternalLinkIcon } from "lucide-react";

export const dashNavLinksList = [
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
    icon: ExternalLinkIcon,
  },
  {
    name: "Stripe",
    href: "https://dashboard.stripe.com/test/dashboard",
    icon: ExternalLinkIcon,
  },
];
