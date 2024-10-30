import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowLeftCircleIcon, ChevronDownCircle } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <section className="mt-6">
      <h1 className={`${montserrat.className} text-2xl font-bold`}>
        Frequently Asked Questions
      </h1>
      <article className="ml-4 my-4 max-w-lg">
        <div className="flex flex-col gap-4">
          <Collapsible>
            <CollapsibleTrigger className="p-3 bg-zinc-300 dark:bg-zinc-700 rounded-md">
              <div className="flex justify-center items-center gap-1">
                Question number one? <ChevronDownCircle size={24} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perferendis vel saepe error quis distinctio in a ipsa recusandae
              dolore dolor, provident quae sed aliquid iure, ex tenetur quidem
              quod corporis!
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="p-3 bg-zinc-300 dark:bg-zinc-700 rounded-md">
              <div className="flex justify-center items-center gap-1">
                Question number two? <ChevronDownCircle size={24} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perferendis vel saepe error quis distinctio in a ipsa recusandae
              dolore dolor, provident quae sed aliquid iure, ex tenetur quidem
              quod corporis!
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="p-3 bg-zinc-300 dark:bg-zinc-700 rounded-md">
              <div className="flex justify-center items-center gap-1">
                Question number three? <ChevronDownCircle size={24} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perferendis vel saepe error quis distinctio in a ipsa recusandae
              dolore dolor, provident quae sed aliquid iure, ex tenetur quidem
              quod corporis!
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="p-3 bg-zinc-300 dark:bg-zinc-700 rounded-md">
              <div className="flex justify-center items-center gap-1">
                Question number four? <ChevronDownCircle size={24} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perferendis vel saepe error quis distinctio in a ipsa recusandae
              dolore dolor, provident quae sed aliquid iure, ex tenetur quidem
              quod corporis!
            </CollapsibleContent>
          </Collapsible>
        </div>
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
