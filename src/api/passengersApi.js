import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/passanger/";

export function getPassengers() {
  console.log("url is " + baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getPassengersByFlight(id) {
  return fetch(baseUrl + "?flightNumber=" + id)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(handleError);
}

export function checkin_out_Passanger(passanger) {
  console.log("url is " + baseUrl + "?flightNumber=" + passanger[0].id);
  return fetch(baseUrl + passanger[0].id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(passanger[0]),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(handleError);
}
