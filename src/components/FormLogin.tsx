"use client";

import { User } from "@/interfaces";
import styles from "./FormLogin.module.css";

export default function FormLogin({ users }:{ users: User[] }) {
  const handleSubmit = async (event:React.FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const userid = event.currentTarget.user.value;

    console.log(`Log in! userid=${userid}`);
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
