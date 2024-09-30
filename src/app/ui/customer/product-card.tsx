import Image from "next/image";
import { montserrat } from "../fonts";
import Link from "next/link";

interface ProductCardProps {
  productId: number;
}

const ProductCard = ({ productId }: ProductCardProps) => {
  return (
    <div className="border border-zinc-500 rounded-lg shadow-xl w-full flex flex-col bg-zinc-200 dark:bg-zinc-800 hover:cursor-pointer">
      <Link href={`products/${productId}`}>
        <div className="w-fit self-center pt-1 px-1">
          <Image
            src="/placeholder.png"
            alt="placeholder"
            width={2400}
            height={2400}
            className="rounded-lg"
          />
        </div>
        <div className="px-5 py-3">
          <h2 className={`text-lg font-semibold ${montserrat.className}`}>
            Product name
          </h2>
          <p className="text-sm">
            Sizes: <span>S / M / L</span>
          </p>
          <p className="text-sm">
            Price: $<span>10.00</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
