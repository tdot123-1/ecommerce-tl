import Image from "next/image";
import { montserrat } from "../ui/fonts";
import { Button } from "@/components/ui/button";
import { LucideBriefcase, ShirtIcon, SmileIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex justify-center items-center gap-6 h-[calc(100vh-80px)]">
        <div className="w-60 dark:hidden">
          <Image src="/logo4.png" alt="Logo" width={298} height={390} />
        </div>
        <div className="w-60 hidden dark:block">
          <Image src="/logo4-w.png" alt="Logo" width={298} height={390} />
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

      <section className="h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row justify-evenly items-center h-fit w-full">
          {/* image container */}
          <div className="flex flex-row gap-2">
            {/* large image */}
            <div className="w-40 sm:w-60 md:w-80 lg:w-96">
              <Image
                src="/placeholder.png"
                alt="placeholder"
                width={2400}
                height={2400}
              />
            </div>
            {/* stacked images */}
            <div className="flex flex-col justify-between">
              <div className="w-20 sm:w-28 md:w-36 lg:w-44">
                <Image
                  src="/placeholder.png"
                  alt="placeholder"
                  width={2400}
                  height={2400}
                />
              </div>
              <div className="w-20 sm:w-28 md:w-36 lg:w-44">
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
            <article>
              <h1
                className={`${montserrat.className} text-center md:text-left mt-4 md:mt-0 text-3xl font-semibold mb-3`}
              >
                Easy Shopping
              </h1>
              <p className="w-72 sm:w-80 text-center md:text-left md:w-60 text-zinc-600 dark:text-zinc-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                exercitationem obcaecati architecto voluptatibus, similique,
                veniam, libero eum at et vitae rerum provident consectetur
                voluptates quasi ea natus accusantium est illum?
              </p>
            </article>
            <Link href="/products">
              <Button>Link</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center">
        <article className="w-full">
          <h1
            className={`${montserrat.className} text-3xl font-semibold text-center`}
          >
            Browse Categories
          </h1>
          <div>
            {/* category links */}
            <div className="flex justify-evenly items-center gap-3 sm:gap-10 my-16">
              <Link href="/categories/1">
                <div className="p-7 border border-zinc-500 rounded-lg shadow-lg">
                  <ShirtIcon size={32} />
                </div>
              </Link>
              <Link href="/categories/2">
                <div className="p-7 border border-zinc-500 rounded-lg shadow-lg">
                  <LucideBriefcase size={32} />
                </div>
              </Link>
              <Link href="/categories/3">
                <div className="p-7 border border-zinc-500 rounded-lg shadow-lg">
                  <SmileIcon size={32} />
                </div>
              </Link>
            </div>
            <p className="w-72 sm:w-80 md:w-96 text-center mx-auto mt-10 text-zinc-600 dark:text-zinc-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
              rem ratione, aperiam fuga, voluptatibus alias tempora iusto
              delectus corrupti odit eos quae itaque sit mollitia hic, maxime
              rerum atque. Est?
            </p>
          </div>
        </article>
      </section>

      <section className="h-screen flex items-center justify-center">
        <div className="flex justify-evenly items-center gap-2 md:gap-0">
          <div className="w-40 sm:w-52 md:w-2/5 flex flex-col gap-7 items-end">
            <article className=" text-right">
              <h1
                className={`${montserrat.className} text-3xl font-semibold mb-3`}
              >
                All Products
              </h1>
              <p className="text-zinc-600 dark:text-zinc-300">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
                rem ratione, aperiam fuga, voluptatibus alias tempora iusto
                delectus corrupti odit eos quae itaque sit mollitia hic, maxime
                rerum atque. Est?
              </p>
            </article>
            <Link href="/products">
              <Button>Link</Button>
            </Link>
          </div>
          <div className="w-32 sm:w-44 md:w-80 lg:w-96">
            <Image
              src="/placeholder.png"
              alt="placeholder"
              width={2400}
              height={2400}
            />
          </div>
        </div>
      </section>
    </>
  );
}
