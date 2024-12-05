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
          <CustomerProfile customerStripeId={userCookie.value} />
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
