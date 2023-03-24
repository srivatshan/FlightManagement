import React from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function FlightDetails(props) {
  return (
    <div>
      <h6 style={{ color: "Blue" }}>Flight Details </h6>

      <Table striped bordered size="sm" style={{ background: "white" }}>
        <thead>
          <tr>
            <th>Flight Id</th>
            <th>Flight Name</th>
            <th>Flight Time</th>
            <th>Total Capacity</th>
          </tr>
        </thead>
        <tbody>
          {props.flights
            .filter((x) => x.id == props.flightid)
            .map((x) => {
              return (
                <tr key={x.id}>
                  <td> {x.id}</td>
                  <td> {x.name}</td>
                  <td> {x.time}</td>
                  <td> {x.capacity}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
FlightDetails.propTypes = {
  flights: PropTypes.array.isRequired,
  flightid: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    flights: state.flights.length === 0 ? [] : state.flights,
    flightid: state.selectedFlight,
  };
}

export default connect(mapStateToProps)(FlightDetails);
