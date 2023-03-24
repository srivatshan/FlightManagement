import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Slide } from "react-toastify";
import Cookies from "universal-cookie";
function SideBar() {
  const activeStyle = { color: "#F15B2A" };
  const [user, setUser] = useState("");
  useEffect(() => {
    const cookies = new Cookies();
    const userDetails = cookies.get("user");
    setUser(userDetails[0].role);
    console.log("userdetails", userDetails[0].role);
  }, []);
  return (
    <nav>
      {user == "staff" && (
        <div>
          <NavLink
            to="/flightDetails"
            style={{ color: "white" }}
            activeStyle={activeStyle}
          >
            Flight Details
          </NavLink>
          <br />
          <NavLink
            to="/passangerDetails"
            style={{ color: "white" }}
            activeStyle={activeStyle}
          >
            Passanger Details
          </NavLink>
          <br />
          <NavLink
            to="/InFlight"
            style={{ color: "white" }}
            activeStyle={activeStyle}
          >
            InFlight
          </NavLink>
          <br />
          <NavLink
            to="/ansillaryRequest"
            style={{ color: "white" }}
            activeStyle={activeStyle}
          >
            Ansillary Request
          </NavLink>
        </div>
      )}

      {user == "admin" && (
        <NavLink to="/" style={{ color: "white" }} activeStyle={activeStyle}>
          Dashboard
        </NavLink>
      )}
    </nav>
  );
}

export default SideBar;
