import jwt from "jsonwebtoken";
import { getLogger } from "@/lib/logger";
import { TokenUser } from "@/interfaces";
const k_token = process.env.JWT_TOKEN || "horsebatterystaple";

const jwtOptsSign = {
  expiresIn: "1h"
};

const jwtOptsVerify = {
  maxAge: "1h"
};

// create a JWT
export const createJWT = async (user: TokenUser, reqID: string="unknown request id"): Promise<string | undefined> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "Lib:Auth:createJWT" });
  return new Promise(async (resolve, reject) => {
    logger.trace("signing user JWT")
    jwt.sign(user, k_token, jwtOptsSign, (err, token) => {
      if (err) {
        logger.error(err, "Could not sign user JWT");
        return reject(err);
      } else {
        logger.trace({token}, "Signed user JWT");
        return resolve(token);
      }
    });
  });
};

// verify a JWT
export const verifyUser = async (token: string, reqID: string="unknown request id"): Promise<TokenUser> => {
  // set up our logger
  const logger = getLogger({ reqID, module: "Lib:Auth:verifyUser" });
  return new Promise(async (resolve, reject) => {
    logger.trace("verifying user JWT")
    jwt.verify(token, k_token, jwtOptsVerify, (err, decoded) => {
      if (err) {
        logger.error(err, "Could not verify user JWT");
        return reject(err);
      } else {
        logger.trace({decoded}, "Verified JWT");
        const { id, username } = decoded as TokenUser;
        return resolve({
          id,
          username
        });
      }
    });
  });
};

export const getUser = async (cookie: string, reqID: string="unknown request id"): Promise<TokenUser | null> => {
  if (!cookie) return null;
  // set up our logger
  const logger = getLogger({ reqID, module: "Lib:Auth:getUser" });
  try {
    logger.trace({cookie}, "Checking user");
    const user = await verifyUser(cookie, reqID);
    logger.trace({user}, "Got user");
    return user;
  } catch (err) {
    logger.error(err, "Could not get user");
    return null;
  }
};
