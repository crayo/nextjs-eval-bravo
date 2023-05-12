import { IronSessionOptions } from "iron-session";
import { unsealData } from "iron-session/edge";
import { NextRequest } from "next/server";
import { Session } from "@/interfaces";

const k_sessionSecret = process.env.SESSION_SECRET || "012345678901234567890123456789012";
const k_sessionCookie = process.env.SESSION_COOKIE || "id_session";

export const ironOptions: IronSessionOptions = {
  cookieName: k_sessionCookie,
  password: k_sessionSecret,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSessionFromEncryptedString = async (enc: string):Promise<Session | null> => {
  if (!enc) return null;
  const session = await unsealData(enc, { password: k_sessionSecret }) as Session;
  return session;
};

export const getSessionFromCookies = async (cookies):Promise<Session | null> => {
  const cookie = cookies.get(k_sessionCookie);
  if (cookie?.value) {
    return await getSessionFromEncryptedString(cookie?.value);
  }
  return null;
};

export const getSession = async (request: NextRequest):Promise<Session | null> => {
  const requestCookies = request.cookies;
  return await getSessionFromCookies(requestCookies);
}
