import Form from "@/app/ui/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <>
      <section className="mt-20 sm:w-64 sm:mx-auto">
        <Form />
      </section>
    </>
  );
};

export default Page;
