// Replies Page (Loading)
// src/app/posts/[id]/@replies/loading.tsx
import { getLogger } from "@/lib/logger";
import { parseHeaders } from "@/lib/util";
import styles from "./loading.module.css";

export default async function RepliesLoading() {
  const { reqID  } = parseHeaders();
  // set up our logger
  const logger = getLogger({ reqID, module: "Page:Replies:Loading" });
  logger.trace("loading replies");

  return (
    <div className={styles.container}>
      Loading the post replies!
    </div>
  );
}
