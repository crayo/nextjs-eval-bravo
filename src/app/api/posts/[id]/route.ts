import { NextRequest, NextResponse } from 'next/server';
import { getPostById, addPost } from "@/data-access/posts";
import { getSession } from "@/lib/session";
import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";
import { NewPost } from "@/interfaces";

interface PostParams {
  params: {
    id: string
  }
};

interface PostBody {
  title?: string,
  content: string
};

export const GET = async (request: NextRequest, { params }:PostParams): Promise<NextResponse> => {
  const { reqID } = parseHeaders();
  const logger = getLogger({ reqID, params, module:"API:Post:GET" });
  const { id:postid } = params;

  logger.trace("Getting post");
  const post = await getPostById(postid, reqID);
  if (!post) return NextResponse.json({ status:"error", error:"Could not load the post." }, { status: 404 });

  return NextResponse.json({
    status: "OK",
    post
  });
};

// post a reply to an existing post
export const POST = async (request: NextRequest, { params }:PostParams): Promise<NextResponse> => {
  const { id:postid } = params;
  const { reqID } = parseHeaders();
  const logger = getLogger({ reqID, params, module:"API:Post:POST" });
  // we'll get the session directly from the request cookie ourselves
  logger.trace("getting session");
  const session = await getSession(request);

  logger.trace({session}, "Checking session");
  if (!session || !session.user) return NextResponse.json({ status:"error", error:"You must be logged in to post a reply." }, { status: 401 });
  const user = session?.user;

  const body = await request.json() as PostBody;
  const { title, content } = body;

  const newPost = {
    irt: postid,
    title,
    content,
    userid: user.id,
    username: user.username,
    createdAt: new Date()
  } as NewPost;
  logger.trace({newPost}, "Adding reply");
  const result = await addPost(newPost, reqID);
  const { insertedId } = result;
  if (!insertedId) return NextResponse.json({ status:"error", error:"Could not post the reply." }, { status: 500 });

  return NextResponse.json({ status: "OK", id: insertedId });
};
