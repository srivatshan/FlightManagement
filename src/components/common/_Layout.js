import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import PageNotFound from "../PageNotFound";
import Cookies from "universal-cookie";
import PrivateRoute from "./PrivateRoute";
import Home from "../checkIn/Home";
import FlightDetails from "../checkIn/FlightDetails";
import Inflight from "../inFlight/Inflight";
import Dashboard from "../admin/Dashboard";
import SideBar from "./SideBar";
import PassangerDetails from "../checkIn/PassangerDetails";
import AnsillaryRequest from "../inFlight/AnsillaryRequest";
function _Layout() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const cookies = new Cookies();
    const userDetails = cookies.get("user");
    setUser(userDetails[0].role);
    console.log("userdetails", userDetails[0].role);
  }, []);
  return (
    <div className="container-fluid">
      <div className=" outer row">
        <div
          className="col-2"
          style={{
            minHeight: "95vh",
            height: "95vh",
            background: "#101820FF",
            borderRadius: "5px",
          }}
        >
          <SideBar />
        </div>
        <div
          className="col-10"
          style={{
            minHeight: "95vh",
            height: "95vh",
            background: "pink",
            borderRadius: "5px",
          }}
        >
          <Header />
          <hr />
          <Switch>
            <PrivateRoute
              exact
              path="/flightDetails"
              component={FlightDetails}
            />
            <PrivateRoute
              exact
              path="/passangerDetails"
              component={PassangerDetails}
            />
            <PrivateRoute
              exact
              path="/ansillaryRequest"
              component={AnsillaryRequest}
            />

            <PrivateRoute exact path="/InFlight" component={Inflight} />
            <PrivateRoute
              exact
              path="/"
              component={user == "staff" ? Home : Dashboard}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default _Layout;
