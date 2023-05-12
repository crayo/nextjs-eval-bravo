import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';
import { getSession } from "@/lib/session";

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  if (!requestHeaders.has("x-request-id")) requestHeaders.set("x-request-id", nanoid());

  // get session
  const session = await getSession(request);
  if (session) {
    requestHeaders.set("x-session", JSON.stringify(session));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
