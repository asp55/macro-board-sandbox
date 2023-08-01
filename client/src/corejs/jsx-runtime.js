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
export const jsx = (tag, props) => {
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
export const jsxs = jsx;