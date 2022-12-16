import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { Component } from "react";

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ history, location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};
