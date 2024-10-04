import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasketIcon } from "lucide-react";
import BasketContent from "./basket-content";

const Basket = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <ShoppingBasketIcon size={24} />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Shopping Basket</SheetTitle>
        <SheetDescription>
          <BasketContent />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
