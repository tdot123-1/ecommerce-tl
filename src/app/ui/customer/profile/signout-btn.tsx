"use client";

import { Button } from "@/components/ui/button";
import { deleteCookie } from "@/lib/actions/cookies/actions";
import { LoaderPinwheelIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    await deleteCookie();
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.push("/")
  };
  return (
    <Button onClick={handleClick} disabled={isLoading}>
      <div className="flex items-center justify-center gap-1">
        {isLoading ? (
          <LoaderPinwheelIcon size={20} className="animate-spin" />
        ) : (
          <LogOutIcon size={20} />
        )}
        <span>Sign out</span>
      </div>
    </Button>
  );
};

export default SignoutButton;
