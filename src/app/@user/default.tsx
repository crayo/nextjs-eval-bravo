// User Profile Page
// src/app/@user/default.tsx
import { getLogger } from "@/lib/logger";
import { parseHeaders } from "@/lib/util";
import FormLogout from "@/components/FormLogout";
import styles from "./default.module.css";

export default async function Profile() {
  const { reqID, session } = parseHeaders();
  const logger = getLogger({ reqID, module: "Page:Profile" });

  logger.trace({ session }, "Got session data");
  const user = session?.user || null;
  logger.trace({ user }, "got user");
  if (!user) return <div>No user</div>;

  return (
    <div className={styles.container}>
      <div className={styles.greeting}>{`Hello, ${user.username}`}</div>
      <FormLogout />
    </div>
  );
}
