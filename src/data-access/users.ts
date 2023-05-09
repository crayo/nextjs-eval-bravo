import { getDB } from "@/lib/db";
import { getLogger } from "@/lib/logger";

const k_collectionUsers = "bravo_users";

export interface User {
  _id: string,
  id?: string,
  username: string
};

interface FilterUser {
  _id?: string,
  username?: string
};

export const getUsers = async (filter: FilterUser={}, reqID: string="unknown request id"): Promise<User[]>  => {
  const logger = getLogger({reqID, module: "DB:Users:getUsers"});
  // get our database connection
  logger.trace("Getting our DB connection");
  const db = await getDB();

  // fetch the posts
  logger.trace({filter}, "Fetching users");
  const users = await db.collection<User>(k_collectionUsers)
    .find(
      filter,
      {
        projection: {
          id: "$_id",
          username: 1
        }
      }
    )
    .toArray();
  logger.trace(users, "Fetched users");

  return users;
};

export const getUserByName = async (username: string, reqID: string="unknown request id"): Promise<User | null> => {
  const users = await getUsers({username}, reqID);
  return users.length === 1 ? users[0] : null;
};

export const getUserById = async (_id: string, reqID: string="unknown request id"): Promise<User | null> => {
  const users = await getUsers({_id}, reqID);
  return users.length === 1 ? users[0] : null;
};
