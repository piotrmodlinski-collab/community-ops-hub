import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = resolve(rootDir, "node_modules", "vite", "bin", "vite.js");
const port = process.env.PORT || "4173";

const child = spawn(process.execPath, [viteBin, "preview", "--host", "0.0.0.0", "--port", port], {
  cwd: rootDir,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

