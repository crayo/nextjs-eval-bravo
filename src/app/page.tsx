import { parseHeaders } from "@/lib/util";
import { getLogger } from "@/lib/logger";

export default async function Home() {
  const { reqID  } = await parseHeaders();
  // set up our logger
  const logger = getLogger({ reqID, module: "Page:Home" });

  logger.trace("Showing topics");
  return (
    <div>Topics go here</div>
  );
}
