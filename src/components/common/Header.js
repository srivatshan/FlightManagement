import React, { useEffect, useState } from "react";
import FlightFilterView from "./FlightFilterView";
function Header() {
  return (
    <div className="container-fluid">
      <div className=" outer row">
        <FlightFilterView />
      </div>
    </div>
  );
}

export default Header;
