import Image from "next/image";
import { montserrat } from "./ui/fonts";
import { Button } from "@/components/ui/button";
import {
  ChefHatIcon,
  LucideBriefcase,
  LucideDiamond,
  ShirtIcon,
  ShowerHeadIcon,
  SmileIcon,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="flex justify-center items-center gap-6 h-[calc(100vh-80px)]">
        <div className="w-60">
          <Image src="/logo4.png" alt="Logo" width={298} height={390} />
        </div>
        <div className="hidden md:block w-1/2">
          <Image
            src="/hero-placeholder.jpg"
            alt="Hero"
            width={1920}
            height={1280}
            className="rounded-lg"
          />
        </div>
      </section>

      <section className="h-screen">
        <article className="h-full">
          <h1 className={`${montserrat.className} text-3xl font-semibold`}>
            Easy Shopping
          </h1>
          <div className="flex justify-evenly items-center h-fit mt-20">
            {/* image container */}
            <div className="flex flex-row gap-2">
              {/* large image */}
              <div className="w-96">
                <Image
                  src="/placeholder.png"
                  alt="placeholder"
                  width={2400}
                  height={2400}
                />
              </div>
              {/* stacked images */}
              <div className="flex flex-col justify-between">
                <div className="w-44">
                  <Image
                    src="/placeholder.png"
                    alt="placeholder"
                    width={2400}
                    height={2400}
                  />
                </div>
                <div className="w-44">
                  <Image
                    src="/placeholder.png"
                    alt="placeholder"
                    width={2400}
                    height={2400}
                  />
                </div>
              </div>
            </div>
            {/* text and link */}
            <div className="flex flex-col items-center gap-7">
              <p className="w-60 text-zinc-600 dark:text-zinc-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                exercitationem obcaecati architecto voluptatibus, similique,
                veniam, libero eum at et vitae rerum provident consectetur
                voluptates quasi ea natus accusantium est illum?
              </p>
              <Button>Link</Button>
            </div>
          </div>
        </article>
      </section>

      <section className="h-screen">
        <article>
          <h1 className={`${montserrat.className} text-3xl font-semibold`}>
            Browse Categories
          </h1>
          <div>
            {/* category links */}
            <div className="flex justify-evenly items-center gap-10 mt-20">
              <div className="p-7 border border-zinc-500 rounded-lg shadow-lg">
                <ShirtIcon size={32} />
              </div>
              <div className="p-7 border border-zinc-500 rounded-lg shadow-lg">
                <LucideBriefcase size={32} />
              </div>
              <div className="p-7 border border-zinc-500 rounded-lg shadow-lg">
                <SmileIcon size={32} />
              </div>
            </div>
            <p className=" w-60 mx-auto mt-10 text-zinc-600 dark:text-zinc-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
              rem ratione, aperiam fuga, voluptatibus alias tempora iusto
              delectus corrupti odit eos quae itaque sit mollitia hic, maxime
              rerum atque. Est?
            </p>
          </div>
        </article>
      </section>
      <section className="h-screen">
        <article>
          <h1 className={`${montserrat.className} text-3xl font-semibold`}>
            All Products
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae rem
            ratione, aperiam fuga, voluptatibus alias tempora iusto delectus
            corrupti odit eos quae itaque sit mollitia hic, maxime rerum atque.
            Est?
          </p>
        </article>
      </section>
    </>
  );
}
