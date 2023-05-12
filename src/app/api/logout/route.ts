import { getIronSession } from "iron-session/edge";
import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";
import { ironOptions } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { reqID } = parseHeaders();
  const logger = getLogger({ reqID, module: "API:Logout" });

  // init our session access
  logger.trace("accessing session");
  const response = NextResponse.json({ status: "OK" });
  const session = await getIronSession(request, response, ironOptions);
  logger.trace("Destroying session");
  session.destroy();

  logger.trace("responding ok");
  return response;
};
