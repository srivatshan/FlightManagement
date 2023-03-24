import * as types from "./actionTypes";
import * as flightsApi from "../../api/ansillaryApi";

export function getAnsillaryService() {
  return flightsApi
    .getAnsillaryService()
    .then((pgr) => {
      return pgr;
    })
    .catch((error) => {
      throw error;
    });
}
