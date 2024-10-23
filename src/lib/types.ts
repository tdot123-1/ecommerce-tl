export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    currency: string;
    sizes: string;
    category: string;
    image_url: string;
    stripe_product_id: string | undefined ;
    stripe_price_id: string | undefined;
  }

export type EditableProduct = Omit<Product, "stripe_price_id" | "stripe_product_id">

export interface CartItem {
  id: string;
  name: string;
  stripe_price_id: string;
  quantity: number;
  size: string;
}

export interface User {
  name: string;
  email: string; 
  password: string;
}