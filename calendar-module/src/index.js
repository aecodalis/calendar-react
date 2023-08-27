import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./custom";

const render = (AppToRender) => {
  ReactDOM.render(<AppToRender />, document.getElementById("calendar-module"));
};

render(App);

// if (module.hot) {
//   module.hot.accept("./app", () => {
//     const NextApp = require("./app").default;
//
//     render(NextApp);
//   });
// }
