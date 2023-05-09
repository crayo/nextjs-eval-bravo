import { getDB } from "@/lib/db";
import { getLogger } from "@/lib/logger";
import { getFullPostByUrlid } from "@/data-access/posts";
import { v4 as uuidv4 } from 'uuid';
import { stripHtml } from "string-strip-html";

interface InputComment {
  urlid: string,
  comment: string,
  owner: string
};

export type Comment = {
  _id: string,
  postId: string,
  comment: string,
  owner: string,
  timestamp: Date
};

export const getCommentsForPost = async (urlid: string, reqID: string="unknown request id"): Promise<Comment | null> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "DataAccess:getCommentsForPost" });

  // get our comments
  logger.trace({ urlid }, "Getting comments for post");
  const postData = await getFullPostByUrlid(urlid, reqID);
  logger.trace(postData, "Fetched post data");
  return postData.length === 1 ? postData[0].comments : null;
};

export const addCommentToPost = async (input: InputComment, reqID:string="unknown request id"): Promise<any> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "DataAccess:addCommentToPost" });
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // add our post
  const { comment, urlid, owner } = input;
  logger.trace({ comment, urlid, owner }, "Adding a comment to post");
  const result = await db.collection("posts").aggregate([
    { $match: { urlid } },
    {
      $project: {
        _id: uuidv4(),
        postId: "$_id",
        timestamp: new Date(),
        owner,
        comment: stripHtml(comment).result
      }
    },
    {
      $merge: {
        into: "comments",
        on: "_id",
        whenMatched: "fail",
        whenNotMatched: "insert"
      }
    }
  ]).toArray();
  logger.trace(result, "Added comment");
  return result;
};
