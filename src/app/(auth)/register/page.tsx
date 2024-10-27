import RedirectToLogin from "@/app/ui/auth/redirect-login";
import Form from "@/app/ui/auth/register-form";

const allowRegister = false;

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
