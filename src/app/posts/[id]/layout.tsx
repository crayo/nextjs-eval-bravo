// Post Page Layout
// src/app/posts/[id]/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./layout.module.css";

export default async function PostLayout(
  {
    children,
    post,
    replies
  }:{
    children:ReactNode,
    post:ReactNode,
    replies:ReactNode
  }
) {
  return (
    <div className={styles.container}>
      <div className={styles.return}><Link href="/">&lt; return to topics</Link></div>
      <div className={styles["container-main"]}>{children}</div>
      <div className={styles["container-post"]}>{post}</div>
      <div className={styles["container-replies"]}>{replies}</div>
    </div>
  );
}
