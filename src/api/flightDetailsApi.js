import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/flightDetails";

export function getFlights() {
  console.log("url is " + baseUrl);
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
