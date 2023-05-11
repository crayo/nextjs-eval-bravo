import { NextResponse } from 'next/server';
import { getUsers } from "@/data-access/users";
import { parseHeaders } from "@/lib/util";

export const GET = async (): Promise<NextResponse> => {
  const { reqID } = parseHeaders();
  const users = await getUsers({}, reqID);

  return NextResponse.json({ status: "ok", users: users.map(u => ({ id: u.id, username: u.username })) });
};
