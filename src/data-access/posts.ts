import { nanoid } from 'nanoid';
import { stripHtml } from "string-strip-html";
import { getDB } from "@/lib/db";
import { getLogger } from "@/lib/logger";

const k_collectionPosts = "bravo_posts";

interface NewPost {
  irt?: string | null,
  title?: string,
  content: string,
  userid: string,
  username: string
};

interface Post {
  _id: string,
  irt: string | null,
  userid: string,
  username: string,
  title: string | null,
  content: string,
  createdAt: Date,
  deletedAt?: Date | null
};

interface FullPost extends Post {
  replies: Post[]
};

interface FilterPosts {
  _id?: string,
  userid?: string,
  username?: string,
  title?: string,
  irt?: string | null
};

export const getPosts = async (filter: FilterPosts={}, reqID="unknown request id"): Promise<Post[]> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "Data:Posts:getPosts" });
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // fetch the posts
  logger.trace({filter}, "Fetching posts");
  const posts = await db.collection<Post>(k_collectionPosts).find(
    {
      ...filter,
      deletedAt: null
    },
    {
      sort: {
        createdAt: -1
      }
    }
  ).toArray();
  logger.trace(posts, "Fetched posts");

  return posts;
};

export const getAllPosts = (reqID?: string) => (getPosts({}, reqID));
export const getAllRootPosts = (reqID?: string) => (getPosts({ irt: null }, reqID));
export const getPostById = async (_id: string, reqID?: string): Promise<Post | null> => {
  const posts = await getPosts({_id}, reqID);
  return posts.length > 0 ? posts[0] : null;
};
export const getPostReplies = async (id: string, reqID?: string) => (getPosts({irt: id}, reqID));

export const addPost = async (post: NewPost, reqID="unknown request id") => {
  // set up our logger
  const logger = getLogger({ reqID, module: "Data:Posts:addPost" });
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // add our post
  logger.trace(post, "Adding new post");
  const { irt=null, title=null, content, userid, username } = post;
  const result = await db.collection<Post>(k_collectionPosts).insertOne({
    _id: nanoid(),
    irt: irt || null,
    createdAt: new Date(),
    deletedAt: null,
    userid,
    username,
    title: title ? stripHtml(title).result : null,
    content: stripHtml(content).result
  });
  logger.trace(result, "Added post");
  return result;
};

export const getFullPostById = async (_id: string, reqID: string="unknown request id"): Promise<FullPost | null> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "Data:Posts:getFullPostById" });
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // fetch post and its comments
  logger.trace({_id}, "Fetching post and replies");

  const postData = await db.collection(k_collectionPosts).aggregate([
    { $match: { _id, deletedAt: null } },
    {
      $lookup: {
        from: k_collectionPosts,
        let : { post_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$irt", "$$post_id"] },
                  { $eq: ["$deletedAt", null]}
                ]
              }
            }
          }
        ],
//        localField: "_id",
//        foreignField: "irt",
        as: "replies"
      }
    },
    {
      $unwind: {
        path: "$replies",
        preserveNullAndEmptyArrays: true
      }
    }
    ,{
      $sort: {
        "replies.timestamp": -1
      }
    }
    ,{
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        userid: { $first: "$userid" },
        username: { $first: "$username" },
        createdAt: { $first: "$createdAt" },
        content: { $first: "$content" },
        replies: { $push: "$replies" }
      }
    }
  ]).toArray() as FullPost[];
  const post = postData?.length > 0 ? postData[0] : null;
  logger.trace(post, "Fetched post and comments");

  return post;
};
