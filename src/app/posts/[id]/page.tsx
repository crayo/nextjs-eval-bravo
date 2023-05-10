// Post Page
// src/app/posts/[id]/page.tsx
import { parseHeaders } from "@/lib/util";
import styles from "./page.module.css";

export default async function Post({ params }:{ params:{ id: string }}) {
  const { reqID  } = parseHeaders();
  const { id: postId } = params;

  return (
    <div className={styles.container}>
      New post form goes here?
    </div>
  );
}
