'use strict';
//import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import NavBar from "./navBar";

const React = require('react');
const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>

)
