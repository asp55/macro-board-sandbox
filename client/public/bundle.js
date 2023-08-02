/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
;// CONCATENATED MODULE: ./src/App.jsx



console.log("APP");
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