import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./login/LoginPage";
import PageNotFound from "./PageNotFound";
import Header from "./common/Header";
import _Layout from "./common/_Layout";
import PrivateRoute from "./common/PrivateRoute";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute path="/" component={_Layout} />

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
