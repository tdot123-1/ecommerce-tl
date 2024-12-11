export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  currency: string;
  sizes: string;
  category: string;
  image_url: string;
  stripe_product_id: string | undefined;
  stripe_price_id: string | undefined;
}

export type CreatedProduct = Omit<Product, "sizes" | "category">

export type EditableProduct = Omit<Product, "stripe_product_id">;

export interface CartItem {
  id: string;
  name: string;
  stripe_price_id: string;
  stripe_product_id: string;
  quantity: number;
  size: string;
}

export interface ValidationProduct {
  id: string;
  stripe_price_id: string;
  stripe_product_id: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface PromoCode {
  id: string;
  code: string;
  max_redemptions: number | null;
  times_redeemed: number;
  active: boolean;
  minimum_amount: number | null;
  first_time_transaction: boolean;
  expires_at: number | null;
  created: number;
}

export interface Coupon {
  id: string;
  name: string | null;
  percent_off: number | null;
  redeem_by: number | null;
  max_redemptions: number | null;
  times_redeemed: number;
  valid: boolean;
  created: number;
}
