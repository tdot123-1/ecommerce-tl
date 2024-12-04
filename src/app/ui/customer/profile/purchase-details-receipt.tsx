import { getOneSession } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

interface PurchaseDetailsReceiptProps {
  sessionId: string;
}

const PurchaseDetailsReceipt = async ({
  sessionId,
}: PurchaseDetailsReceiptProps) => {
  const allItems = await getOneSession(sessionId);

  return (
    <div>
      <ul>
        {allItems.map((item) => (
          <li key={item.stripe_id}>
            <p>{item.price ? formatPrice(item.price) : "N/A"}</p>
            <p>{item.quantity}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseDetailsReceipt;
