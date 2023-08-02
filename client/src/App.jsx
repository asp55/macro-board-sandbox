import Button from "./components/Button";


function startWebsocket() {
  const protocol = (window.location.protocol == "https:") ? "wss" : "ws"
  var ws = new WebSocket(`${protocol}://%%HOST%%:%%WSPORT%%`);

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


const App = () => (
  <div>
    <Button onClick={() => alert(1)}>Click 11</Button>
    <Button onClick={() => alert(2)}>Click 12</Button>
    <Button onClick={() => alert(3)}>Click 14</Button>
  </div>
);

const rootElement = document.getElementById("root");
rootElement.appendChild(<App/>);

export default App;