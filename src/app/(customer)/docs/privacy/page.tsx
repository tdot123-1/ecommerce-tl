import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <section className="mt-6">
      <h1 className={`${montserrat.className} text-2xl font-bold`}>
        Privacy Policy
      </h1>
      <article className="ml-4 my-4 max-w-lg">
        <h2 className={`${montserrat.className} text-xl font-semibold`}>
          Cookies
        </h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium
          sit pariatur facere voluptatibus a voluptatem, exercitationem,
          repellendus esse voluptate, nostrum id eos corporis eius ipsam ullam?
          Dolorum magni numquam itaque! Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Necessitatibus ipsum optio velit mollitia eveniet
          illum unde eius laboriosam sint amet voluptatum, vel nesciunt aliquid,
          rem harum doloribus nobis numquam itaque.
        </p>
        <h2 className={`${montserrat.className} text-xl font-semibold mt-4`}>
          Sensitive Data
        </h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          blanditiis enim pariatur. Aliquam dolorem ipsum rem aperiam fugit
          labore sint accusantium cupiditate harum iste facere dolore,
          necessitatibus debitis, obcaecati suscipit.
        </p>
        <h2 className={`${montserrat.className} text-xl font-semibold mt-4`}>
          Third-party Cookies
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
