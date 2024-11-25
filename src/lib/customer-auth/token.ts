"use server";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("No JWT secret found");
}

export const generateToken = (userId: string): string => {
  const payload = { userId };
  const options = { expiresIn: "15m" };

  return jwt.sign(payload, JWT_SECRET, options);

  // const token = jwt.sign(payload, JWT_SECRET, options);
  // console.log("TOKEN FROM FUNCTION: ", token);
  // console.log("TOKEN TYPE FROM FUNCTION: ", typeof token);
  // return token;
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

export const generateVerificationLink = (userId: string) => {
  const token = generateToken(userId);
  console.log("TOKEN IN LINK FUNC: ", token);
  console.log("TOKEN TYPE IN LINK FUNC: ", typeof token)
  return `${process.env.NEXT_PUBLIC_URL}/verify/${token}`;
};
