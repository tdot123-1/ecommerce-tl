
import { formatPrice } from "@/lib/utils";

interface PurchaseHistoryProps {
  customerStripeId: string;
}

const PurchaseHistory = async ({ customerStripeId }: PurchaseHistoryProps) => {

  
  return (
    <>
      <div>
        <h2>Purchase history</h2>
        {/* {purchaseHistory.map((session) => (
          <div key={session.sessionId}>
            <p>{`Date: ${session.created}`}</p>
            <p>{`Total: ${formatPrice(session.amountTotal!) }`}</p>
            <ul>
              {session.items.map((item) => (
                <li key={item.stripe_id}>
                  <div>{item.price}</div>
                  <div>{item.quantity}</div>
                  <div>{item.stripe_id}</div>
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default PurchaseHistory;
