import SendMagicLink from "@/app/ui/customer/mailing/send-magic-link";
import SignupForm from "@/app/ui/customer/mailing/signup-form";
import CustomerProfile from "@/app/ui/customer/profile/customer-profile";
import ProfileSignIn from "@/app/ui/customer/profile/profile-signin";
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
          <CustomerProfile customerStripeId={userCookie.value} />
          <div>Sign out</div>
          <div>Delete profile</div>
        </div>
      ) : (
        <div className="sm:w-2/4 lg:w-1/3 mx-auto my-8">
          <ProfileSignIn />
        </div>
      )}
    </>
  );
};

export default Page;
