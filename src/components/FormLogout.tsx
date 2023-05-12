"use client";

import styles from "./FormLogout.module.css";
import { useRouter } from 'next/navigation';

export default function FormLogout() {
  const router = useRouter();

  const handleSubmit = async (event:React.FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // try logging out
    console.log("Logging out");
    const res = await fetch("/api/logout", { method: "GET" });
    if (res) {
      const data = await res.json();
      if (data.status === "OK") {
        console.log("We logged out, let's refresh");
        return router.refresh();
      }
    }
    console.log("Oh no, something went wrong");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-button-logout"]}>
          <button type="submit">Logout</button>
        </div>
      </form>
    </div>
  );
}
