// Post Page
// src/app/@login/default.tsx
import { URL } from "node:url";
import { getLogger } from "@/lib/logger";
import { parseHeaders } from "@/lib/util";
import { JSONUsersResponse } from "@/interfaces";
import FormLogin from "@/components/FormLogin";
import styles from "./default.module.css";

// this should be a server-side fetch
const k_urlApiBase = process.env.BASE_API_URL || "http://localhost:3000/";
const k_urlApiUsers = new URL("/api/users", k_urlApiBase);

export default async function Login() {
  const { reqID } = parseHeaders();
  const logger = getLogger({ reqID, module: "Page:Login" });

  logger.trace("fetching users");
  const response = await fetch(k_urlApiUsers.href, { method: "GET" });
  logger.trace({response}, "got response");
  const { users } = await response.json() as JSONUsersResponse;
  logger.trace({users}, "got users");

  return (
    <div className={styles.container}>
      <FormLogin users={users} />
    </div>
  );
}
