"use client"

import { Button } from "@/components/ui/button";
import { getCookie, setCookie } from "@/lib/actions/cookies/actions";

const SetCookieTest = () => {
  const handleSetCookie = async () => {
    await setCookie("TEST");
  };

  const handleReadCookie = async () => {
    const result = await getCookie();
    console.log("READ COOKIE: ", result);
  };
  return (
    <>
      <Button onClick={handleSetCookie}>SET COOKIE</Button>
      <Button onClick={handleReadCookie}>READ COOKIE</Button>
    </>
  );
};

export default SetCookieTest;
