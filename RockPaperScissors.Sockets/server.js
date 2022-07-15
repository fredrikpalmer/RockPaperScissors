const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const resolver = require("./resolver");

//TODO: Use db
const games = require("./games");

wss.on("connection", function connection(ws, req) {
  ws.on("message", function incoming(message, isBinary) {
    const json = message.toString();
    console.log(json);

    try {
      const msg = JSON.parse(message);
      const handler = resolver.resolve(msg.type);
      handler.handle(ws, games, msg);
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(8080, () => {
  console.log("Listening to port 8080");
});
