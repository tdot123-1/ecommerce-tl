import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <section className="mt-6">
      <h1 className={`${montserrat.className} text-2xl font-bold`}>
        Return Policy
      </h1>
      <article className="ml-4 my-4 max-w-lg">
        <h2 className={`${montserrat.className} text-xl font-semibold`}>
          Refund Conditions
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero optio
          mollitia aperiam, ad soluta quaerat, vitae veritatis possimus officia
          nulla, non adipisci distinctio quod numquam! Facilis magnam qui
          laudantium tempore.
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          <li>{`▶`} Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
          <li>{`▶`} Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
          <li>{`▶`} Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
          <li>{`▶`} Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
        </ul>
        <h2 className={`${montserrat.className} text-xl font-semibold mt-4`}>
          Late Or Missing Refunds
        </h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          blanditiis enim pariatur. Aliquam dolorem ipsum rem aperiam fugit
          labore sint accusantium cupiditate harum iste facere dolore,
          necessitatibus debitis, obcaecati suscipit.
        </p>
        <h2 className={`${montserrat.className} text-xl font-semibold mt-4`}>
          Shipping
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          possimus ullam maxime est vero magnam laborum incidunt, qui minima
          molestiae atque consequuntur eaque enim accusamus ipsa quisquam.
          Eaque, officia expedita?
        </p>
      </article>
      <div className="flex justify-center md:justify-start my-8">
        <Link href="/">
          <Button>
            <div className="flex justify-center items-center gap-1">
              Return <ArrowLeftCircleIcon size={24} />
            </div>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
