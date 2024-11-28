import SendMagicLink from "@/app/ui/customer/mailing/send-magic-link";
import { montserrat } from "@/app/ui/fonts";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Profile",
};

const Page = () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  return (
    <>
      <h1 className={`${montserrat.className} font-bold text-2xl mt-6`}>
        Your Profile
      </h1>
      {userCookie ? (
        <div>
          <div>Customer profile</div>
          <div>Sign out</div>
          <div>Delete profile</div>
        </div>
      ) : (
        <div className="w-2/4 mx-auto my-8">
          <div>
            <h2
              className={`${montserrat.className} mb-4 text-center font-semibold`}
            >
              Sign in to your account
            </h2>
            <p className="mb-4 text-sm text-zinc-800 dark:text-zinc-400 text-center">
              To view your profile and take advantage of discounts, please
              submit your email address below and follow the link you receive in
              your email.
            </p>
            <SendMagicLink />
          </div>
          <div className="mt-8">
            <h2
              className={`${montserrat.className} mb-4 text-center font-semibold`}
            >
              Sign up for an account
            </h2>
            <p className="mb-4 text-sm text-zinc-800 dark:text-zinc-400 text-center">
              Don't have an account yet? Sign up with the form below to take
              advantage of several benefits including exclusive discounts!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
