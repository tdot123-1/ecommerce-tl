import { getAllSessions } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import { montserrat } from "../../fonts";

import PurchaseDetails from "./purchase-details";

interface PurchaseHistoryProps {
  customerStripeId: string;
}

const PurchaseHistory = async ({ customerStripeId }: PurchaseHistoryProps) => {
  const purchaseHistory = await getAllSessions(customerStripeId);

  return (
    <>
      <div className="my-4">
        <h2 className={`${montserrat.className} font-semibold text-lg`}>
          Purchase history
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
          {purchaseHistory.sessions.map((session) => (
            <div
              key={session.sessionId}
              className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg"
            >
              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Date of Purchase</span>:
                </p>
                <p>{session.created}</p>
              </div>
              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Total Paid</span>:
                </p>
                <p>
                  {session.amountTotal
                    ? formatPrice(session.amountTotal)
                    : "N/A"}
                </p>
              </div>

              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Discount</span>:
                </p>
                <p>{session.discounts > 0 ? session.discounts : "N/A"}</p>
              </div>
              <div className="w-fit mx-auto mt-2">
                <PurchaseDetails
                  purchaseDate={session.created}
                  sessionId={session.sessionId}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
