import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  if (!requestHeaders.has("x-request-id")) requestHeaders.set("x-request-id", nanoid());
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
