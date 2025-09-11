"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

type Session = {
  userId: string;
  expire: Date;
};

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export async function setSession(userId: string) {
  const expire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const encryptedToken = await encryptToken({ userId, expire });

  const cookie = await cookies();
  return cookie.set("SESSION_TOKEN", encryptedToken, {
    httpOnly: true,
    expires: expire,
  });
}

export async function getSession() {
  const cookie = await cookies();
  const session = cookie?.get("SESSION_TOKEN");
  const decrypted = await decryptToken(session?.value);

  return decrypted;
}

export async function deleteSession() {
  const cookie = await cookies();
  return cookie.delete("SESSION_TOKEN");
}

export async function encryptToken(payload?: Session) {
  const encrypted = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

  return encrypted;
}

export async function decryptToken(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload;
  } catch (error) {
    console.log(error);
  }
}
