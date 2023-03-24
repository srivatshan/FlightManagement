import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

function isLogin() {
  const cookies = new Cookies();
  const userDetails = cookies.get("user");

  return userDetails != null && userDetails.length > 0 ? true : false;
}
