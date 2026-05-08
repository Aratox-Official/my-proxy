import express from "express";
import { createBareServer } from "@tomphttp/bare-server-node";
import { join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const bareServer = createBareServer("/bare/");

app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

const server = createServer(app);

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.listen(8080, () => {
  console.log("Proxy running on http://localhost:8080");
});
