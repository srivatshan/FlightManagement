import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getAnsillaryService,
  getAnsillaryServiceByID,
} from "../../api/ansillaryApi";

import {
  getPassengersByFlight,
  updateAnsillaryPassanger,
} from "../../redux/actions/passangersAction";
function AnsillaryRequest(props) {
  const [passanger, updatePassanger] = useState([]);
  const [showPopup, updateShow] = useState(false);
  const [ansillary, updateAnsillary] = useState([]);
  const [selectedSeat, updateSeat] = useState(0);
  const [ansillaryDropDown, dropDownHandler] = useState("");

  useEffect(() => {
    getPassangerDetails();
  }, [props.flightid]);

  async function getPassangerDetails() {
    const pas = (await getPassengersByFlight(props.flightid))
      .filter((x) => x.requestAnsillary === true)
      .sort((a, b) => (a.seatNumber > b.seatNumber ? 1 : -1));
    updatePassanger(pas);
    const ans = await getAnsillaryServiceByID(props.flightid);
    updateAnsillary(ans);
  }
  const updateAnsillaryHandler = async () => {
    updateShow(false);
    if (ansillaryDropDown !== "") {
      let pgr = passanger
        .filter((x) => x.seatNumber == selectedSeat)
        .map((x) => {
          return {
            ...x,
            ansillary: [...x.ansillary, ansillaryDropDown],
            requestAnsillary: false,
          };
        });
      let response = (await updateAnsillaryPassanger(pgr))
        .filter((x) => x.requestAnsillary === true)
        .sort((a, b) => (a.seatNumber > b.seatNumber ? 1 : -1));
      updatePassanger(response);
    }
  };

  return (
    <>
      <Modal
        show={showPopup}
        onHide={() => {
          updateShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Ansillary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className=" outer row">
              <div>
                <label>Selected Seat No: </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={selectedSeat}
                  readOnly
                />
              </div>

              <div style={{ paddingLeft: "20px" }}>
                <label>Select Ansillary: </label>
                <select
                  name="selectAnsillary"
                  onChange={(event) => {
                    dropDownHandler(event.target.value);
                  }}
                  className="form-control"
                  style={{ width: "150px" }}
                >
                  <option value="">select</option>
                  {ansillary.map((c) => {
                    return <option key={c.id}>{c.name}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              updateShow(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={updateAnsillaryHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered size="sm" style={{ background: "white" }}>
        <thead>
          <tr>
            <th>Seat No</th>
            <th>PassangerName</th>
            <th>Requested Ansillary</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {passanger.length > 0
            ? passanger.map((x) => {
                return (
                  <tr key={x.id}>
                    <td> {x.seatNumber}</td>
                    <td> {x.name}</td>
                    <td>{x.requestAnsillary === true ? "Yes" : "No"}</td>
                    <td>
                      {x.ansillary.map((y) => {
                        return <li key={y}>{y}</li>;
                      })}
                    </td>
                    <td>
                      <button
                        type="button"
                        id={x.id}
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          updateSeat(x.seatNumber);
                          updateShow(true);
                        }}
                      >
                        Add Service
                      </button>
                    </td>
                  </tr>
                );
              })
            : "No request found"}
        </tbody>
      </Table>
    </>
  );
}

function mapStateToProps(state) {
  return {
    flightid: state.selectedFlight,
    flights:
      state.flights.length === 0
        ? []
        : state.flights
            .filter((x) => x.id == state.selectedFlight)
            .map((x) => x.capacity),
  };
}
export default connect(mapStateToProps)(AnsillaryRequest);
