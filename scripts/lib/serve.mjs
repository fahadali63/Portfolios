// Minimal static server for out/ with Netlify-style clean URLs (/contact → contact.html) and 404.html.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".jpg": "image/jpeg",
  ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".pdf": "application/pdf", ".ico": "image/x-icon",
};

export function serve(root, port = 4173) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    let p = decodeURIComponent(url.pathname);
    const candidates = [p, p + ".html", path.join(p, "index.html")];
    for (const c of candidates) {
      const file = path.join(root, c);
      if (file.startsWith(root) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
        return fs.createReadStream(file).pipe(res);
      }
    }
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(path.join(root, "404.html")).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = path.resolve(import.meta.dirname, "../../out");
  const port = Number(process.argv[2] || 4173);
  await serve(root, port);
  console.log(`Serving out/ at http://localhost:${port}`);
}
