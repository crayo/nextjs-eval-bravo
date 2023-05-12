// Post Page
// src/app/posts/[id]/page.tsx
import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";
import styles from "./page.module.css";

export default function Post({ params }:{ params:{ id: string }}) {
  const { reqID, session } = parseHeaders();
  const { id: postId } = params;
  const logger = getLogger({ reqID, module: "Page:Post" });

  const user = session?.user || null;
  logger.trace({ user }, "User from session");

  return (
    <div className={styles.container}>{
      user ? `Login to post a reply.` : `New reply form goes here?`
    }</div>
  );
}
