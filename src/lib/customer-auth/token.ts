"use server";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("No JWT secret found");
}

export const generateToken = (userId: string) => {
  const payload = { userId };
  const options = { expiresIn: "15m" };

  const token = jwt.sign(payload, JWT_SECRET, options);

  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Token verification failed: ", error);
    return null;
  }
};
