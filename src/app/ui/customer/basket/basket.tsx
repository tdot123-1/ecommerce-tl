import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasketIcon } from "lucide-react";
import BasketContent from "./basket-content";
import { montserrat } from "../../fonts";

const Basket = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <ShoppingBasketIcon size={24} />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className={montserrat.className}>Shopping Basket</SheetTitle>
        <SheetDescription>Your selected items</SheetDescription>
        <BasketContent />
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
