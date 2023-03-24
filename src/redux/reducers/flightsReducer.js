import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function flightsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_FLIGHTS_SUCCESS:
      return action.flights;

    default:
      return state;
  }
}
