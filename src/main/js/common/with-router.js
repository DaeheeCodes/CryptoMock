import { useLocation, useNavigate, useParams, useHistory } from "react-router-dom";

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let history = useHistory();
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ history, location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};
