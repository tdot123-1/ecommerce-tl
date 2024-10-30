import ItemsOverview from "@/app/ui/customer/checkout/items-overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

const Page = () => {
  return (
    <>
      <ItemsOverview />
    </>
  );
};

export default Page;
