import { headers } from "next/headers";
import { SessionUser } from "@/interfaces";

export const parseHeaders = ():{ reqID: string, session: { user: SessionUser | null } | null } => {
  const requestHeaders = headers();
  const reqID = requestHeaders.get("x-request-id") || "unknown request id";
  let session = null;
  if (requestHeaders.has("x-session")) {
    try {
      session = JSON.parse(requestHeaders.get("x-session") || "");
    } catch (err) {
      session = null;
    }
  }

  return {
    reqID,
    session
  };
};
