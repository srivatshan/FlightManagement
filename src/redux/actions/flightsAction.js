import * as types from "./actionTypes";
import * as flightsApi from "../../api/flightDetailsApi";

export function loadFlightsSuccess(flights) {
  return { type: types.LOAD_FLIGHTS_SUCCESS, flights };
}

export function loadSelectedFlight(selectedFlight) {
  return { type: types.SELECTED_FLIGHT_SUCCESS, selectedFlight };
}

export function loadFlights() {
  return function (dispatch) {
    return flightsApi
      .getFlights()
      .then((flight) => {
        dispatch(loadFlightsSuccess(flight));
      })
      .catch((error) => {
        throw error;
      });
  };
}
