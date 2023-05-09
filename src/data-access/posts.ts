import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { stripHtml } from "string-strip-html";
import { getDB } from "@/lib/db";
import { getLogger } from "@/lib/logger";
import { Comment } from "@/data-access/comments";

interface NewPost {
  title: string,
  body: string,
  owner: string
};

interface Post {
  _id: string,
  urlid: string,
  owner: string,
  title: string,
  body: string,
  timestamp: Date
};

interface FullPost extends Post {
  comments: Comment[]
};

interface FilterPosts {
  _id?: string,
  urlid?: string,
  owner?: string,
  title?: string
};

export const getPosts = async (filter: FilterPosts={}, reqID="unknown request id"): Promise<Post[]> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "DataAccess:getPosts" });
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // fetch the posts
  logger.trace({filter}, "Fetching posts");
  const posts = await db.collection<Post>("posts").find(
    filter,
    {
      sort: {
        timestamp: -1
      }
    }
  ).toArray();
  logger.trace(posts, "Fetched posts");

  return posts;
};

export const getAllPosts = (reqID?: string) => (getPosts({}, reqID));
export const getPostByUrlid = async (urlid: string, reqID?: string) => (getPosts({urlid}, reqID));

export const addPost = async (post: NewPost, reqID="unknown request id") => {
  // set up our logger
  const logger = getLogger({ reqID, module: "DataAccess:addPost" });
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // add our post
  logger.trace(post, "Adding new post");
  const { owner, title, body } = post;
  const result = await db.collection<Post>("posts").insertOne({
    _id: uuidv4(),
    urlid: nanoid(),
    timestamp: new Date(),
    owner,
    title: stripHtml(title).result,
    body: stripHtml(body).result
  });
  logger.trace(result, "Added post");
  return result;
};

export const getFullPosts = async (filter: FilterPosts={}, reqID: string="unknown request id"): Promise<FullPost[]> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "DataAccess:getFullPost" });
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // fetch post and its comments
  logger.trace({filter}, "Fetching post and comments");

  const postData = await db.collection("posts").aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments"
      }
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true
      }
    }
    ,{
      $sort: {
        "comments.timestamp": -1
      }
    }
    ,{
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        owner: { $first: "$owner" },
        urlid: { $first: "$urlid" },
        timestamp: { $first: "$timestamp" },
        body: { $first: "$body" },
        comments: { $push: "$comments" }
      }
    }
  ]).toArray() as FullPost[];
  logger.trace(postData, "Fetched post and comments");

  return postData;
};

export const getFullPostByUrlid = (urlid: string, reqID?: string) => (getFullPosts({urlid}, reqID));
