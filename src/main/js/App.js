import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./navBar"
import SingleDayTable from "./singleDayTable";
import UserData from "./userdata";


import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app");
const root = createRoot(container);


root.render(
    <div>
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>
  <UserData />
<SingleDayTable />
    </div>
)
