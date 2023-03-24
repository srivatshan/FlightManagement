import * as types from "./actionTypes";
import * as flightsApi from "../../api/passengersApi";

export function getPassengersByFlight(id) {
  return flightsApi
    .getPassengersByFlight(id)
    .then((pgr) => {
      return pgr.map((x) => {
        if (x.isCheckedin === "Yes") return { ...x, colorCode: "green" };
        if (x.wheelChair === "Yes") return { ...x, colorCode: "yellow" };
        if (x.withInfants === "Yes") return { ...x, colorCode: "orange" };
        else return { ...x, colorCode: "gray" };
      });
    })
    .catch((error) => {
      throw error;
    });
}

export function checkin_out_Passanger(passanger) {
  return flightsApi
    .checkin_out_Passanger(passanger)
    .then((pgr) => {
      return getPassengersByFlight(1);
    })
    .catch((error) => {
      throw error;
    });
}

export function updateAnsillaryPassanger(passanger) {
  return flightsApi
    .checkin_out_Passanger(passanger)
    .then((pgr) => {
      return getPassengersByFlight(1);
    })
    .catch((error) => {
      throw error;
    });
}
