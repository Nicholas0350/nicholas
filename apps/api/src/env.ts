import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables before any other imports
// This must be imported first in index.ts
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });
