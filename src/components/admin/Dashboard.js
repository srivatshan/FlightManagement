import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as flightsAction from "../../redux/actions/flightsAction";
import PassangerDetails from "./PassangerDetails";
import ManageAnsillary from "./ManageAnsillary";
import FlightFilterView from "../common/FlightFilterView";

function Dashboard(props) {
  const [selectedFlight, updateFlight] = useState("");
  const [selectedTime, updateTime] = useState("");

  useEffect(() => {
    const { flights, actions } = props;
    if (flights.length === 0) {
      actions.loadFlights().catch((error) => {
        alert("loading Flights failer " + error);
      });
    }
  });

  return (
    <>
      {/* <div className="container-fluid">
        <div className=" outer row">
          <div style={{ padding: "5px 5px 5px 5px" }}>
            <br /> */}
      {/* <FlightFilterView /> */}
      {/* <label>Select Time: </label>
            <select
              name="selectedTime"
              onChange={(e) => {
                updateTime(e.target.value);
                updateFlight("");
              }}
              className="form-control"
              style={{ width: "150px" }}
            >
              <option value="">select</option>
              {props.flights.map((opt) => {
                return <option key={opt.id}>{opt.time}</option>;
              })}
            </select>
          </div>
          <div style={{ padding: "5px 5px 5px 5px" }}>
            <br />
            <label>Select Flight: </label>
            <select
              name="selectedFlight"
              onChange={(event) => {
                updateFlight(event.target.value);
              }}
              className="form-control"
              style={{ width: "150px" }}
            >
              <option value="">select</option>
              {props.flights
                .filter((a) => a.time === selectedTime)
                .map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div> */}

      {props.flightid != "" && (
        <Tabs>
          <TabList>
            <Tab>Manage Passanger</Tab>
            <Tab> Manage Ansillary </Tab>
          </TabList>

          <TabPanel>
            <PassangerDetails flightId={props.flightid} />
          </TabPanel>
          <TabPanel>
            <ManageAnsillary flightId={props.flightid} />
          </TabPanel>
        </Tabs>
      )}
    </>
  );
}

Dashboard.propTypes = {
  flights: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    flights: state.flights.length === 0 ? [] : state.flights,
    flightid: state.selectedFlight,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadFlights: bindActionCreators(flightsAction.loadFlights, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
