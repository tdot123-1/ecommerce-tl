import RedirectToLogin from "@/app/ui/auth/redirect-login";
import Form from "@/app/ui/auth/register-form";
import { Metadata } from "next";

const allowRegister = false;

export const metadata: Metadata = {
  title: "Register",
};

const Page = () => {
  return (
    <>
      <section className="mt-20 sm:w-64 sm:mx-auto">
        {allowRegister ? <Form /> : <RedirectToLogin />}
      </section>
    </>
  );
};

export default Page;
