import { IronSessionOptions } from "iron-session";

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
