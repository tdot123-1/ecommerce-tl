export const ITEMS_PER_PAGE = 8;

export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("No JWT secret found");
}
