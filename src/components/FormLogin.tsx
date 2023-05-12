"use client";

import { User } from "@/interfaces";
import styles from "./FormLogin.module.css";
import { useRouter } from 'next/navigation';

export default function FormLogin({ users }:{ users: User[] }) {
  const router = useRouter();

  const handleSubmit = async (event:React.FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const userid = event.currentTarget.user.value;

    // try logging in
    console.log(`Logging in user id ${userid}`);
    const res = await fetch(
      "/api/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ id: userid })
      }
    );
    if (res) {
      const data = await res.json();
      if (data.status === "OK") {
        console.log("We logged in, let's refresh");
        return router.refresh();
      }
    }
    console.log("Oh no, something went wrong");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-select-user"]}>
          <label htmlFor="user">Who are you?</label>
          <select name="user" id="select-user">{
            users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))
          }</select>
        </div>
        <div className={styles["form-button-login"]}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
