import { cpSync, mkdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const src = join(__dirname, "node_modules/@mercuryworkshop/scramjet/dist");
const dest = join(__dirname, "public");

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("ScramJet files copied to public/");
