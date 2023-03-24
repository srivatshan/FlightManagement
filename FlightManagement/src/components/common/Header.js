import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
function Header() {
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
        <NavLink to="/" style={{ color: "white" }} activeStyle={activeStyle}>
          checkin
        </NavLink>
      )}

      {user == "admin" && (
        <NavLink to="/" style={{ color: "white" }} activeStyle={activeStyle}>
          Dashboard
        </NavLink>
      )}
    </nav>
  );
}

export default Header;
