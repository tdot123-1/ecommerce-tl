import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

interface BasketItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const BasketItem = ({ id, name, price, quantity, image }: BasketItemProps) => {
  return (
    <li>
      <div className="w-10">
        <Image src={image} alt={name} fill />
      </div>
      <p>{name}</p>
      <div>
        <p>{price}</p>
        <p>{quantity}</p>
      </div>

      <Button><TrashIcon /></Button>
    </li>
  );
};

export default BasketItem;
