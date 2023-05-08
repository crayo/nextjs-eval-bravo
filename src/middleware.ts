import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  if (!requestHeaders.has("x-request-id")) requestHeaders.set("x-request-id", uuidv4());
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
