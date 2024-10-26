"use client";

import { logOut } from "@/auth/actions";
import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Logout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    // clear error, set loading state
    setError("");
    setIsLoading(true);
    try {
      // attempt logout, redirect to login page on success
      const result = await logOut();
      if (result) {
        // display error in ui
        setError(result);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("ERROR LOGOUT: ", error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        onClick={handleLogout}
        className="p-2"
        variant="outline"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderPinwheelIcon size={24} className="animate-spin" />
        ) : (
          <LogOutIcon size={24} />
        )}

        <div className="hidden">Logout</div>
      </Button>
      {error && <p className="text-red-600 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default Logout;
