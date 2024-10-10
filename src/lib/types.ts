export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    currency: string;
    stripe_product_id: string | undefined ;
    stripe_price_id: string | undefined;
  }

export interface CartItem {
  id: string;
  name: string;
  stripe_price_id: string;
  quantity: number;
  size: string;
}