const envalid = require("envalid");
const { str } = envalid;

export const config = envalid.cleanEnv(
  process.env,
  { LOG_LEVEL: str() },
  { strict: true },
);
