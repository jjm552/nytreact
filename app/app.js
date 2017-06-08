// Include the Main React Dependencies
import React from "react";
import ReactDOM from "react-dom";

// var Main = require("./components/main");
import routes from "./config/routes";

// This code renders a simple "Hello World".
// ReactDOM takes in two parameters (a single HTML div or element and the HTML target where it will be rendered)
// The code here will run through webpack and be compiled into plain JavaScript
// The compiled code will be appended into the index.html file in the id called "app"
ReactDOM.render(routes, document.getElementById("app"));