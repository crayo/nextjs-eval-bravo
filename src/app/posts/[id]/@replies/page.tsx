// Post Replies Page
// src/app/posts/[id]/@replies/page.tsx
import { notFound } from "next/navigation";
import { getPostReplies } from "@/data-access/posts";
import { parseHeaders } from "@/lib/util";
import styles from "./page.module.css";

export default async function PostReplies({ params }:{ params:{ id: string } }) {
  const { reqID  } = parseHeaders();
  const { id: postId } = params;

  const replies = await getPostReplies(postId, reqID);
  if (!replies) notFound();

  return (
    <div className={styles.container}>
      <ul className={styles.replies}>
      {
        replies.map(reply => (
          <li key={reply._id} className={styles.reply}>{reply.content}</li>
        ))
      }
      </ul>
    </div>
  );
}
