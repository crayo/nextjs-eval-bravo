"use client";

import { SessionUser  } from "@/interfaces";
import styles from "./FormReply.module.css";
import { useRouter } from 'next/navigation';

export default function FormReply({ user, postid }:{ user:SessionUser, postid:string }) {
  const router = useRouter();

  const handleSubmit = async (event:React.FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const content = event.target.content.value;
    console.log(user);
    console.log(postid);
    console.log(content);

    if (!content) {
      console.log("You have to provide some content!");
    } else {
      // try sending the reply
      const res = await fetch(
        `/api/posts/${postid}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            title: null,
            content
          })
        }
      );
      if (res) {
        const data = await res.json();
        console.log(`Got data`, data);
        if (data.status === "OK") {
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
        <div className={styles["form-reply-content"]}>
          <label htmlFor="content">What do you want to say?</label>
          <textarea name="content" id="reply-content" placeholder="Put stuff here" rows={5} cols={40} />
        </div>
        <div className={styles["form-button-reply"]}>
          <button type="submit">Reply</button>
        </div>
      </form>
    </div>
  );
}
