import { headers } from "next/headers";

export const parseHeaders = ():{ reqID: string, userToken: string | null } => {
  const requestHeaders = headers();
  return {
    reqID: requestHeaders.get("x-request-id") || "unknown request id",
    userToken: requestHeaders.get("x-token-user") || null
  };
};
