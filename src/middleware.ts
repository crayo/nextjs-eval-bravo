import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';
import { unsealData } from "iron-session/edge";
import { ironOptions } from "@/lib/session";

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const requestCookies = request.cookies;
  if (!requestHeaders.has("x-request-id")) requestHeaders.set("x-request-id", nanoid());

  const { cookieName, password } = ironOptions;
  const cookie = requestCookies.get(cookieName);
  if (cookie?.value) {
    const session = await unsealData(cookie?.value, { password });
    if (session) {
      requestHeaders.set("x-session", JSON.stringify(session));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
