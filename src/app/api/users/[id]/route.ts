import { NextResponse } from 'next/server';
import { getUserById } from "@/data-access/users";
import { parseHeaders } from "@/lib/util";

export const GET = async (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const { id: userid } = params;
  const { reqID } = parseHeaders();
  const user = await getUserById(userid, reqID);
  if (!user) return new NextResponse(JSON.stringify({ status: "error", error: `No user found with id: ${userid}` }), { status: 404 });

  const { id, username } = user;
  return NextResponse.json({ status: "ok", user: { id, username } });
};
