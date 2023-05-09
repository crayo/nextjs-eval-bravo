import pino, { Logger } from "pino";

const levels: string[] = ["fatal", "error", "warn", "info", "debug", "trace", "silent"];
const k_logLevel: string = process.env?.LOG_LEVEL || "info";

let logger: Logger;

// what kind of options can be passed to a child logger?
interface LoggerChildOpts {
  reqID?: string,  // request id
  module?: string, // which module is doing the logging
  [x: string | number | symbol]: unknown // allow pretty much anything else
};

// initialization function that sets up our primary logger
const init = () => {
  const level = levels.includes(k_logLevel) ? k_logLevel : "info";
  const opts = {
    level
  };

  logger = pino(opts);
  logger.info(`Logging initialized with level: ${level}`);
  return logger;
};

// getLogger
//
// Initializes logger if it hasn't already been initialized.
// returns a configured child logger or the primary logger
export const getLogger = (childOpts?: LoggerChildOpts): Logger => {
  if (!logger) {
    init();
  }
  return childOpts ? logger.child(childOpts) : logger;
};
