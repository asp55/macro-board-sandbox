import { createRoot } from 'react-dom/client';
import Main from './components/Main';

import "./style.scss"

const root = createRoot(document.getElementById('root'));

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
    //console.log(e.data);
    var json = JSON.parse(e.data);
    console.log(json);
    if(json.action && json.action === "update") {
      root.render(<Main sheets={json.sheets}/>);
    }
    return false;
  };
  window.ws = ws;
}
startWebsocket();



root.render(<Main id="main"/>);