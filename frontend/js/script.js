function startWebsocket() {
  var ws = new WebSocket("wss://4dh7f4-8081.csb.app");

  ws.onopen = () => {
    console.log(Date.now(), "WebSocket is open now.");
    //ws.send("Connected");
  };

  ws.onerror = (error) => {
    console.log(Date.now(), `WebSocket error: ${error}`);
  };

  ws.onclose = (event) => {
    console.log(Date.now(), "WebSocket is closed now. Reconnecting in 0.5s");
    // connection closed, discard old websocket and create a new one in 0.5s
    ws = null;
    setTimeout(startWebsocket, 500);
  };

  ws.onmessage = (e) => {
    console.log(e.data);
    var json = JSON.parse(e.data);
    if (json.action === "update") {
      updatePanel(json.inMeeting);
    }
    return false;
  };
  window.ws = ws;
}
startWebsocket();
