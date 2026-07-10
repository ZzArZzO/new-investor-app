/**
 * Creates the ./shared link to ../app/src so mobile can import the web app's
 * content and pure-logic modules (@/content/*, @/lib/*). Runs on postinstall.
 * Uses a junction on Windows (no admin rights needed) and a symlink elsewhere.
 */
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "..", "..", "app", "src");
const link = path.resolve(__dirname, "..", "shared");

if (!fs.existsSync(target)) {
  console.error(`link-shared: target ${target} does not exist — is app/ checked out?`);
  process.exit(1);
}

try {
  const stat = fs.lstatSync(link);
  if (stat.isSymbolicLink() || stat.isDirectory()) {
    process.exit(0); // already linked
  }
} catch {
  // Doesn't exist yet — create below.
}

fs.symlinkSync(target, link, process.platform === "win32" ? "junction" : "dir");
console.log(`link-shared: created ${link} -> ${target}`);
