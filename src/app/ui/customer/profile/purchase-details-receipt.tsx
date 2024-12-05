import { fetchPurchaseHistoryProducts } from "@/lib/data/products/store/data";
import { getOneSession } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

interface PurchaseDetailsReceiptProps {
  sessionId: string;
}

const PurchaseDetailsReceipt = async ({
  sessionId,
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

  return (
    <div>
      <ul>
        {formattedItems.map((item) => (
          <li key={item.stripe_id} className="pb-1 mb-1 border-b border-b-zinc-300">
            <h3>{item.name}</h3>
            <div className="flex justify-around">
              <p>{item.price ? formatPrice(item.price) : "N/A"}</p>
              <p>x {item.quantity}</p>
            </div>
            
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
      {/* session total + total items */}
    </div>
  );
};

export default PurchaseDetailsReceipt;
