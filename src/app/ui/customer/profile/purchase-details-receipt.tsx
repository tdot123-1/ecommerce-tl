import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchPurchaseHistoryProducts } from "@/lib/data/products/store/data";
import { getOneSession } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { montserrat } from "../../fonts";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PurchaseDetailsReceiptProps {
  sessionId: string;
  amountTotal: number | null;
}

const PurchaseDetailsReceipt = async ({
  sessionId,
  amountTotal,
}: PurchaseDetailsReceiptProps) => {
  const allItems = await getOneSession(sessionId);

  const stripeProductIdList = allItems.map((item) => item.stripe_id);

  const productsFromDb = await fetchPurchaseHistoryProducts(
    stripeProductIdList
  );

  const formattedItems = allItems.map((stripeItem) => {
    const matchingItem = productsFromDb.find(
      (dbItem) => dbItem.stripeProductId === stripeItem.stripe_id
    );

    return {
      stripe_id: stripeItem.stripe_id,
      price: stripeItem.price,
      quantity: stripeItem.quantity || "N/A",
      description: stripeItem.description || "N/A",
      discount: stripeItem.discount,
      name: matchingItem?.name || "N/A",
      imageUrl: matchingItem?.imageUrl || "/placeholder.png",
    };
  });

  const totalQuantity = allItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <div>
      <ScrollArea className="h-80">
        <ul>
          {formattedItems.map((item) => (
            <li
              key={item.stripe_id}
              className="pb-1 mb-1 border-b border-b-zinc-300"
            >
              <div className="flex justify-around items-center mb-1">
                <h3 className={`${montserrat.className}`}>{item.name}</h3>
                <div className="w-16  sm:w-20  relative">
                  <AspectRatio ratio={7 / 8}>
                    <Image
                      className="rounded-lg"
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="
                  (max-width: 640px) 40vw, 
                  (max-width: 1024px) 20vw, 
                  (max-width: 1280px) 10vw, 
                  8vw"
                    />
                  </AspectRatio>
                </div>
              </div>
              <div className="flex justify-around">
                <p>{item.price ? formatPrice(item.price) : "N/A"}</p>
                <p>x {item.quantity}</p>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-400 italic">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {/* session total + total items */}
      <div className="flex justify-around mt-4">
        <p>
          <span className="font-semibold">Total Paid</span>:{" "}
          {amountTotal ? formatPrice(amountTotal) : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Total Items</span>: {totalQuantity}
        </p>
      </div>
    </div>
  );
};

export default PurchaseDetailsReceipt;
