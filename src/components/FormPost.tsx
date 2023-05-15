"use client";

import { SessionUser  } from "@/interfaces";
import styles from "./FormPost.module.css";
import { useRouter } from 'next/navigation';

export default function FormPost({ user }:{ user:SessionUser }) {
  const router = useRouter();

  const handleSubmit = async (event:React.FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const title = event.target.title.value;
    const content = event.target.content.value;
    console.log(user);
    console.log(title);
    console.log(content);

    if (!content) {
      console.log("You have to provide some content!");
    } else {
      // try sending the reply
      const res = await fetch(
        `/api/posts/`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      );
      if (res) {
        const data = await res.json();
        console.log(`Got data`, data);
        if (data.status === "OK") {
          event.target.title.value= "";
          event.target.content.value = "";
          console.log("Reply posted, let's refresh.");
          return router.refresh();
        }
      }
    }

    console.log("Oh no, something went wrong");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-post-title"]}>
          <label htmlFor="title">What is this about?</label>
          <input name="title" id="post-title" minLength={3} />
        </div>
        <div className={styles["form-post-content"]}>
          <label htmlFor="content">What do you want to say?</label>
          <textarea name="content" id="post-content" placeholder="Put stuff here" rows={5} cols={40} />
        </div>
        <div className={styles["form-button-reply"]}>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
