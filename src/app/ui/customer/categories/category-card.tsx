import { Card, CardContent } from "@/components/ui/card";
import { capitalize } from "@/lib/utils";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  description: string;
  image_url: string;
}

const CategoryCard = ({ title, description, image_url }: CategoryCardProps) => {
  return (
    <>
      <Card className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src={image_url}
          alt={title}
          fill
          className="absolute inset-0 z-0 blur-sm"
        />
        <CardContent className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/40 p-4">
            <h2 className="text-xl font-bold">{capitalize(title)}</h2>
            <p className="text-sm">{description}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryCard;
