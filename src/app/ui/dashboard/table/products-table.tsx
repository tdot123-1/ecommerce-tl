import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, ImageIcon, TagsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ActivateSwitch from "./components/activate-product";
import DeleteButton from "./components/delete-product";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatPrice } from "@/lib/utils";
import FeatureButton from "./components/feature-product-btn";
import { fetchAllProducts } from "@/lib/data/products/dashboard/data";

interface ProductsTableProps {
  currentPage: number;
}

const ProductsTable = async ({ currentPage }: ProductsTableProps) => {
  const allProducts = await fetchAllProducts(currentPage);

  return (
    <Table>
      <TableCaption>All Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Primary Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sizes</TableHead>
          <TableHead>Images</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allProducts ? (
          allProducts.map((product) => (
            <TableRow key={product.id}>
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
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatPrice(product.price)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.sizes}</TableCell>
              <TableCell>
                <Link href={`products/images/edit/${product.id}`}>
                  <Button variant="ghost" className="p-2">
                    <p className="hidden">Edit Images</p>
                    <ImageIcon size={24} />
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`products/tags/edit/${product.id}`}>
                  <Button variant="ghost" className="p-2">
                    <p className="hidden">Edit Tags</p>
                    <TagsIcon size={24} />
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <ActivateSwitch
                  defaultValue={product.is_active}
                  productId={product.id}
                  category={product.category}
                  isFeatured={product.is_featured}
                />
              </TableCell>
              <TableCell>
                <FeatureButton
                  isFeatured={product.is_featured}
                  productId={product.id}
                  isActive={product.is_active}
                />
              </TableCell>
              <TableCell>
                <Link href={`products/edit/${product.id}`}>
                  <Button variant="ghost" className="p-2">
                    <p className="hidden">Edit</p>
                    <EditIcon size={24} />
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <DeleteButton
                  isActive={product.is_active}
                  productId={product.id}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>No products found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
