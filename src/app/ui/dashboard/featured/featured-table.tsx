import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import FeatureButton from "../table/components/feature-product-btn";
import DatePicker from "./featured-date-picker";
import clsx from "clsx";
import { checkDeadline } from "@/lib/utils";
import { fetchFeaturedProductsDashboard } from "@/lib/data/products/dashboard/data";

const FeaturedTable = async () => {
  const featuredProducts = await fetchFeaturedProductsDashboard();

  return (
    <Table>
      <TableCaption>Featured Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Update Dates</TableHead>
          <TableHead>Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {featuredProducts && featuredProducts.length > 0 ? (
          featuredProducts.map((product, index) => (
            <TableRow key={product.product_id}>
              <TableCell>
                <div className="w-20 relative">
                  <AspectRatio ratio={8 / 9}>
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 40vw, 
                            (max-width: 1024px) 20vw, 
                            (max-width: 1280px) 10vw, 
                            8vw"
                      className="rounded-md"
                    />
                  </AspectRatio>
                </div>
              </TableCell>
              <TableCell
                className={clsx({ "text-red-600 line-through": index > 5 })}
              >
                {product.name}
              </TableCell>
              <TableCell>
                {new Date(product.start_date).toLocaleDateString()}
              </TableCell>
              <TableCell
                className={clsx({
                  "text-red-600": product.end_date
                    ? checkDeadline(new Date(product.end_date))
                    : false,
                })}
              >
                {product.end_date
                  ? new Date(product.end_date).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <DatePicker
                  productId={product.product_id}
                  initialStartDate={new Date(product.start_date)}
                  initialEndDate={
                    product.end_date ? new Date(product.end_date) : null
                  }
                />
              </TableCell>
              <TableCell>
                <FeatureButton
                  isFeatured
                  isActive
                  productId={product.product_id}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>No featured products found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FeaturedTable;
