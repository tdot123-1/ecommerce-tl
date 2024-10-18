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
import { fetchAllProducts } from "@/lib/data";
import { EditIcon } from "lucide-react";
import Image from "next/image";

const ProductsTable = async () => {
  const allProducts = await fetchAllProducts();

  return (
    <Table>
      <TableCaption>All Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sizes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allProducts ? (
          allProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="w-20 h-20 relative">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="10vw"
                    className="rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>€{product.price / 100}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.sizes}</TableCell>
              <TableCell>
                <Button variant="ghost" className="p-2">
                  <EditIcon size={24} />
                </Button>
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
