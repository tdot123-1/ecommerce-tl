import Image from "next/image";
import { montserrat } from "./ui/fonts";
import { Button } from "@/components/ui/button";

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
        <article className="grid grid-cols-4 grid-rows-5 gap-1">
          <div className="col-span-4">
            <h1 className={`${montserrat.className} text-3xl font-semibold`}>
              Easy Shopping
            </h1>
          </div>
          <div className="col-span-2 row-span-3 row-start-2">
            <Image
              src="/placeholder.png"
              alt="placeholder"
              width={2400}
              height={2400}
            />
          </div>
          <div className="row-span-2 col-start-3 row-start-2">
            <Image
              src="/placeholder.png"
              alt="placeholder"
              width={2400}
              height={2400}
            />
          </div>
          <div className="row-span-2 col-start-3 row-start-4">
            <Image
              src="/placeholder.png"
              alt="placeholder"
              width={2400}
              height={2400}
            />
          </div>
          <div className="row-span-3 col-start-4 row-start-2">
            <p className=" text-zinc-600 dark:text-zinc-400">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
              rem ratione, aperiam fuga, voluptatibus alias tempora iusto
              delectus corrupti odit eos quae itaque sit mollitia hic, maxime
              rerum atque. Est?
            </p>
          </div>
          <div className="col-start-4 row-start-5">
            <Button>Button</Button>
          </div>
        </article>
      </section>
      <section className="h-screen">
        <article>
          <h1 className={`${montserrat.className} text-3xl font-semibold`}>
            Browse Categories
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae rem
            ratione, aperiam fuga, voluptatibus alias tempora iusto delectus
            corrupti odit eos quae itaque sit mollitia hic, maxime rerum atque.
            Est?
          </p>
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
