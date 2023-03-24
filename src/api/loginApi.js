import { handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/loginCredentials";

export function getCredentials(username, password) {
  return fetch(baseUrl + "/?username=" + username + "&&password=" + password)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(handleError);
}
