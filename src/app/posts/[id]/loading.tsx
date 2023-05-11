// Replies Page (Loading)
// src/app/posts/[id]/@replies/loading.tsx
import { getLogger } from "@/lib/logger";
import { parseHeaders } from "@/lib/util";
import styles from "./loading.module.css";

export default function FullPostLoading() {
  const { reqID  } = parseHeaders();
  // set up our logger
  const logger = getLogger({ reqID, module: "Page:FullPost:Loading" });
  logger.trace("loading full post");

  return (
    <div className={styles.container}>
      Loading a sub-component!
    </div>
  );
}
