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
import { Button } from "@/components/ui/button";

const Basket = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={`ghost`} className="p-2">
          <ShoppingBasketIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className={montserrat.className}>
          Shopping Basket
        </SheetTitle>
        <SheetDescription>Your selected items</SheetDescription>
        <BasketContent />
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
