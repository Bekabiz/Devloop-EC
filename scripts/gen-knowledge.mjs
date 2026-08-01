// Regenerates api/_knowledge.js from src/data/chatbot-knowledge.md so the
// serverless function always ships the same knowledge base as the repo doc.
// Run after editing the markdown: node scripts/gen-knowledge.mjs
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const md = readFileSync(join(root, "src/data/chatbot-knowledge.md"), "utf8")
const out = `// GENERATED from src/data/chatbot-knowledge.md — do not edit by hand.
// Regenerate with: node scripts/gen-knowledge.mjs
export const KNOWLEDGE = ${JSON.stringify(md)}
`
writeFileSync(join(root, "api/_knowledge.js"), out)
console.log("api/_knowledge.js written,", md.length, "chars")
