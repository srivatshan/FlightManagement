import { combineReducers } from "redux";
import courses from "./courseReducer";
import flights from "./flightsReducer";

const rootReducer = combineReducers({
  courses,
  flights,
});

export default rootReducer;
