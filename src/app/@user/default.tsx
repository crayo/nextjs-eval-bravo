// User Profile Page
// src/app/@user/default.tsx
import { getLogger } from "@/lib/logger";
import { parseHeaders } from "@/lib/util";
import { getUser } from "@/lib/auth";
import styles from "./default.module.css";

export default async function Login() {
  const { reqID, userToken } = parseHeaders();
  const logger = getLogger({ reqID, module: "Page:Profile" });

  if (!userToken) return <div>No Token</div>;

  logger.trace({userToken}, "getting user");
  const user = await getUser(userToken, reqID);
  logger.trace({user}, "got user");
  if (!user) return <div>No user</div>;

  return (
    <div className={styles.container}>{`Hello, ${user.username}`}</div>
  );
}
