/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/corejs/jsx-runtime.js
const add = (parent, child) => {
  parent.appendChild(child?.nodeType ? child : document.createTextNode(child));
};
const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(nestedChild => appendChild(parent, nestedChild));
  } else {
    add(parent, child);
  }
};
const jsx = (tag, props) => {
  console.log("JSX",tag,props)
  const {
    children
  } = props;
  if (typeof tag === "function") {
    console.log("Tag function:",tag(props,children));
    return tag(props, children);
  }

  console.log("Tag",tag);
  const element = document.createElement(tag);
  console.log("JSX Element",element);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith("on") && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value);
    } else {
      element.setAttribute(name, value);
    }
  });
  appendChild(element, children);
  return element;
};
const jsxs = jsx;
;// CONCATENATED MODULE: ./src/components/Button.jsx

const Button = ({
  children,
  onClick
}) => jsx("button", {
  onClick: onClick,
  children: children
});
/* harmony default export */ const components_Button = (Button);
;// CONCATENATED MODULE: ./src/style.scss
/* harmony default export */ const style = (__webpack_require__.p + "css/style.min.css");
;// CONCATENATED MODULE: ./src/App.jsx




function startWebsocket() {
  const protocol = window.location.protocol == "https:" ? "wss" : "ws";
  var ws = new WebSocket(`${protocol}://Andrewp-macbookpro16.local:7071`);
  ws.onopen = () => {
    console.log(Date.now(), "WebSocket is open now.");
    //ws.send("Connected");
  };

  ws.onerror = error => {
    console.log(Date.now(), `WebSocket error: ${error}`);
  };
  ws.onclose = event => {
    console.log(Date.now(), "WebSocket is closed now. Reconnecting in 0.5s");
    // connection closed, discard old websocket and create a new one in 0.5s
    ws = null;
    setTimeout(startWebsocket, 500);
  };
  ws.onmessage = e => {
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
const App = () => jsxs("div", {
  children: [jsx(components_Button, {
    onClick: () => alert(1),
    children: "Click 11"
  }), jsx(components_Button, {
    onClick: () => alert(2),
    children: "Click 12"
  }), jsx(components_Button, {
    onClick: () => alert(3),
    children: "Click 14"
  })]
});
const rootElement = document.getElementById("root");
rootElement.appendChild(jsx(App, {}));
/* harmony default export */ const src_App = ((/* unused pure expression or super */ null && (App)));
/******/ })()
;