import { getLogger } from "@/lib/logger";
import { parseHeaders } from "@/lib/util";

export default async function User() {
  const { reqID } = await parseHeaders();
  // set up our logger
  const logger = getLogger({ reqID, module: "Page:User" });
  const user = null;

  logger.trace({user}, "Showing user page");
  return (
    <div>{user ? `Welcome ${user.username}` : `Please log in` }</div>
  );
}
