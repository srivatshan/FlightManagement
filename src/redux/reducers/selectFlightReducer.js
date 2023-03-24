import * as types from "../actions/actionTypes";

export default function selectFlightReducer(state = 0, action) {
  switch (action.type) {
    case types.SELECTED_FLIGHT_SUCCESS:
      return action.selectedFlight;

    default:
      return state;
  }
}
