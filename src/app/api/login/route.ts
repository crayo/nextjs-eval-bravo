import { getIronSession } from "iron-session/edge";
import { getUserById } from "@/data-access/users";
import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";
import { ironOptions } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { reqID } = parseHeaders();
  const logger = getLogger({ reqID, module: "API:Login" });
  const body = await request.json();
  logger.trace({ body }, "Request body");
  const { id: userid } = body;

  if (!userid) return NextResponse.json({ status: "error", error: "You must provide an id" }, { status: 400 });

  logger.trace({ userid }, "Fetching user by ID");
  const user = await getUserById(userid, reqID);
  logger.trace({ user }, "Got user");
  if (!user) return NextResponse.json({ status: "error", error: "User not found" }, { status: 400 });

  // get user from database then:
  logger.trace("creating session data");
  const response = NextResponse.json({ status: "OK" });
  const session = await getIronSession(request, response, ironOptions);
  const { _id: id, username } = user;
  session.user = { id, username };
  logger.trace("Saving session");
  await session.save();

  logger.trace("responding ok");
  return response;
};
