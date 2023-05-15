import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { addPost } from "@/data-access/posts";
import { getSession } from "@/lib/session";
import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";
import { NewPost } from "@/interfaces";

interface PostBody {
  title: string,
  content: string
};

// post a reply to an existing post
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { reqID } = parseHeaders();
  const logger = getLogger({ reqID, module:"API:Post:POST" });
  // we'll get the session directly from the request cookie ourselves
  logger.trace("getting session");
  const session = await getSession(request);

  logger.trace({session}, "Checking session");
  if (!session || !session.user) return NextResponse.json({ status:"error", error:"You must be logged in to make a post." }, { status: 401 });
  const user = session?.user;

  const body = await request.json() as PostBody;
  const { title, content } = body;

  const newPost = {
    _id: nanoid(),
    irt: null,
    title,
    content,
    userid: user.id,
    username: user.username,
    createdAt: new Date()
  } as NewPost;
  logger.trace({newPost}, "Adding post");
  const result = await addPost(newPost, reqID);
  const { insertedId } = result;
  if (!insertedId) return NextResponse.json({ status:"error", error:"Could not add the post." }, { status: 500 });

  return NextResponse.json({ status: "OK", id: insertedId });
};
