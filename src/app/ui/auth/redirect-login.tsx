import { Button } from "@/components/ui/button";
import {  ArrowBigRightIcon, LockIcon } from "lucide-react";
import Link from "next/link";

const RedirectToLogin = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <LockIcon size={32} />
      <h2 className="text-xl font-semibold">Registration unavailable!</h2>
      <div>
        <Link href="/login">
          <Button>
            <div className="flex justify-center items-center gap-1">
                <span>Continue To Login</span>
                <ArrowBigRightIcon size={24} />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RedirectToLogin;
