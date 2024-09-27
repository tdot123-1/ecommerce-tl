import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasketIcon } from "lucide-react";

const Basket = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <ShoppingBasketIcon size={24} />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Shopping Basket</SheetTitle>
        <SheetDescription>Your items</SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
