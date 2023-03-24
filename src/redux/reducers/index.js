import { combineReducers } from "redux";
import courses from "./courseReducer";
import flights from "./flightsReducer";
import selectedFlight from "./selectFlightReducer";

const rootReducer = combineReducers({
  courses,
  flights,
  selectedFlight,
});

export default rootReducer;
