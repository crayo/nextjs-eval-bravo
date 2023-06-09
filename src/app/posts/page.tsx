// Topics Page
// src/app/page.tsx
import Link from "next/link";
import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";
import FormPost from "@/components/FormPost";
import { getAllRootPosts } from "@/data-access/posts";
import styles from "./page.module.css";

export default async function Topics() {
  const { reqID, session } = parseHeaders();
  // set up our logger
  const logger = getLogger({ reqID, module: "Page:Topics" });

  const user = session?.user || null;
  logger.trace({ user }, "User from session");

  const topics = await getAllRootPosts(reqID);
  logger.trace({topics}, "fetched topics");

  logger.trace("Showing topics");
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Topics</div>
      <div className={styles["form-topic"]}>{
        user ? <FormPost user={user} /> : `Please log in to post a new topic.`
      }</div>
      <ul className={styles["topic-list"]}>
      {
        topics.map(topic => {
          logger.trace({topic}, "listing topic");
          return <li key={topic._id} className={styles.topic}>
            <Link href={`/posts/${topic._id}`}>{topic.title}</Link>
          </li>
        })
      }
      </ul>
    </div>
  );
}
