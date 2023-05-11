// Post Page (Loading)
// src/app/posts/[id]/@post/loading.tsx
import { getLogger } from "@/lib/logger";
import { parseHeaders } from "@/lib/util";
import styles from "./loading.module.css";

export default function PostLoading() {
  const { reqID  } = parseHeaders();
  // set up our logger
  const logger = getLogger({ reqID, module: "Page:Post:Loading" });
  logger.trace("loading post");

  return (
    <div className={styles.container}>
      Loading the post!
    </div>
  );
}
