const http = require("http");
const WebSocket = require("ws");
const fs = require("fs/promises");
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || process.env.npm_package_config_backendport || 8081;

const FrontEndPath = "./client/public";

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", async (req, res) => {
  const filePath =
    req._parsedUrl.path.split(".").length >= 2
      ? path.resolve(__dirname, `${FrontEndPath}${req._parsedUrl.path}`)
      : path.resolve(__dirname, `${FrontEndPath}${req._parsedUrl.path}/index.html`);

  if (
    await fs
      .stat(filePath)
      .then(() => true)
      .catch(() => false)
  ) {
    console.log(filePath);
    res.sendFile(filePath);
  } else {
    res.write("404");
    res.end();
  }
});

const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.isAlive = true;
  ws.on("pong", () => (ws.isAlive = true));
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(JSON.stringify({ data: `Hello, you sent -> ${message}` }));
  });

  //send immediatly a feedback to the incoming connection
  //ws.send(JSON.stringify({ action: "restart" }));
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
    //ws.ping(null, false, true);
  });
}, 10000);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);



  //Open the browser
  let command;
  const os = require('os');
  const { exec } = require('child_process');

  const osPlatform = os.platform(); 
  const url = `http://${os.hostname()}:${PORT}`;

  if (osPlatform === 'win32') {
    command = `start microsoft-edge:${url}`;
  } else if (osPlatform === 'darwin') {
    command = `open ${url}`;
  } else {
    command = `google-chrome --no-sandbox ${url}`;
  }
  console.log(`executing command: ${command}`);

  //exec(command);
});
