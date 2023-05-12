// Post Page
// src/app/posts/[id]/page.tsx
import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";
import FormReply from "@/components/FormReply";
import styles from "./page.module.css";

export default function PagePost({ params }:{ params:{ id: string }}) {
  const { reqID, session } = parseHeaders();
  const { id: postid } = params;
  const logger = getLogger({ reqID, module: "Page:Post" });

  const user = session?.user || null;
  logger.trace({ user }, "User from session");

  return (
    <div className={styles.container}>{
      user ? <FormReply user={user} postid={postid} /> : `Login to post a reply.`
    }</div>
  );
}
