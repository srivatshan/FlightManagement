import React, { useState, useEffect } from "react";
import * as flightsAction from "../../redux/actions/flightsAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function FlightFilterView(props) {
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
      <div style={{ padding: "5px 5px 5px 5px" }}>
        <br />
        <label>Select Time: </label>
        <select
          name="selectedTime"
          onChange={(e) => {
            updateTime(e.target.value);
            props.actions.selectedFlightId(0);
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
          onChange={(e) => {
            props.actions.selectedFlightId(e.target.value);
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
    </>
  );
}

FlightFilterView.propTypes = {
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
      selectedFlightId: bindActionCreators(
        flightsAction.loadSelectedFlight,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightFilterView);
