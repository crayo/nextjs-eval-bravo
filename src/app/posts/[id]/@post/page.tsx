// Post Page
// src/app/posts/[id]/@post/page.tsx
import { notFound } from "next/navigation";
import { getPostById } from "@/data-access/posts";
import { parseHeaders } from "@/lib/util";
import styles from "./page.module.css";

export default async function Post({ params }:{ params:{ id: string } }) {
  const { reqID  } = parseHeaders();
  const { id: postId } = params;

  const post = await getPostById(postId, reqID);
  if (!post) notFound();

  await new Promise(resolve => {
    setTimeout(() => {
      return resolve(true);
    }, 5000);
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.content}>{post.content}</div>
    </div>
  );
}
