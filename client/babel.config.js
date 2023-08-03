const path = require('path');

const presets = [];
const plugins = [
  [
    "@babel/plugin-transform-react-jsx",
    { runtime: "automatic"},
  ],
];

console.log(plugins);

module.exports = (api)=> {
  
  api.cache(false);
  return {
    presets,
    plugins,
  };
}