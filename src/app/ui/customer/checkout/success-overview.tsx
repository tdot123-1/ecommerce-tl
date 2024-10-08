"use client";

// import { getSession } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessOverview = () => {
  const searchParams = useSearchParams();
  const [session, setSession] = useState();

  //   const getSession = async (sessionId: string) => {
  //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  //     const sessionData = await stripe.checkout.sessions.retrieve(sessionId);

  //     console.log("session: ", sessionData);
  //   };

  const fetchSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/checkout?session_id=${sessionId}`);
      const data = await res.json();

      console.log("session data: ", data);

      setSession(data);
    } catch (error) {
      console.error("Failed to fetch session details", error);
    }
  };

  useEffect(() => {
    console.log("params: ", searchParams);
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      fetchSession(sessionId);
    }

    // if (sessionId) {
    //   getSession(sessionId);
    // }
  }, [searchParams]);

  return (
    <div>
      <p>Order overview</p>
      {session ? (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SuccessOverview;
