import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/ansillaryService";

export function getAnsillaryService() {
  return fetch(baseUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(handleError);
}

export function getAnsillaryServiceByID(id) {
  console.log("ansilary Api", baseUrl + "/?flightId=" + id);
  return fetch(baseUrl + "/?flightId=" + id)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(handleError);
}

export function saveAnsillary(ansillary) {
  console.log("ansillary Api , save ansillary", ansillary);
  let id = ansillary[0].id > 0 ? ansillary[0].id : "";
  return fetch(baseUrl + "/" + id || "", {
    method: ansillary[0].id > 0 ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ansillary[0]),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function DeleteAnsillary(ansillary) {
  console.log("ansillary Api , save ansillary", ansillary);

  return fetch(baseUrl + "/" + ansillary[0].id, {
    method: "Delete",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ansillary[0]),
  })
    .then(handleResponse)
    .catch(handleError);
}
