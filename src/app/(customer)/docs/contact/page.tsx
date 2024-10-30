import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  ArrowLeftCircleIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <section className="mt-6">
      <h1 className={`${montserrat.className} text-2xl font-bold`}>Contact</h1>
      <div>
        <ul className="flex flex-col gap-4 ml-2 mt-4">
          <li className="flex justify-start items-center">
            <div className="flex justify-center items-center gap-1">
              <PhoneIcon size={18} />
              <span className="font-semibold">Tel.</span>
            </div>
            <p className="text-sm">: +33 01 23 45 67</p>
          </li>
          <li className="flex justify-start items-center">
            <div className="flex justify-center items-center gap-1">
              <MailIcon size={18} />
              <span className="font-semibold">Email</span>
            </div>
            <p className="text-sm">: support@test.com</p>
          </li>
          <li className="flex justify-start items-center">
            <div className="flex justify-center items-center gap-1">
              <LinkedInLogoIcon width={18} height={18} />
              <span className="font-semibold">LinkedIn</span>
            </div>
            <p className="text-sm">: linkedin.com/this-account</p>
          </li>
          <li className="flex justify-start items-center">
            <div className="flex justify-center items-center gap-1">
              <InstagramLogoIcon width={18} height={18} />
              <span className="font-semibold">Instagram</span>
            </div>
            <p className="text-sm">: instagram.com/this-account</p>
          </li>
        </ul>
        <div className="flex justify-center md:justify-start my-8">
          <Link href="/">
            <Button>
              <div className="flex justify-center items-center gap-1">
                Return <ArrowLeftCircleIcon size={24} />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
