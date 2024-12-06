import {
  HomeIcon,
  ImageIcon,
  LucideStar,
  LucideTags,
  MailIcon,
  PlusSquare,
  ReceiptEuroIcon,
  Table2Icon,
} from "lucide-react";

export const sidebarLinksList = [
  {
    name: "Home",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Products Overview",
    href: "/dashboard/products",
    icon: Table2Icon,
  },
  {
    name: "Create Product",
    href: "/dashboard/products/create",
    icon: PlusSquare,
  },
  {
    name: "Featured Products",
    href: "/dashboard/products/featured",
    icon: LucideStar,
  },
  {
    name: "Product Images",
    href: "/dashboard/products/images",
    icon: ImageIcon,
  },
  {
    name: "Product Tags",
    href: "/dashboard/products/tags",
    icon: LucideTags,
  },
  {
    name: "Discounts",
    href: "/dashboard/discounts",
    icon: ReceiptEuroIcon,
  },
  {
    name: "Mailing",
    href: "/dashboard/mailing",
    icon: MailIcon,
  },
];
