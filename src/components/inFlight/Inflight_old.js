import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import {
  getAnsillaryService,
  getAnsillaryServiceByID,
} from "../../api/ansillaryApi";
import {
  getPassengersByFlight,
  checkin_out_Passanger,
  updateAnsillaryPassanger,
} from "../../redux/actions/passangersAction";

class Inflight_old extends React.Component {
  state = {
    show: false,
    selectedId: null,
    passenger: [
      {
        id: null,
        name: "",
        dateOfBirth: "",
        address: "",
        passportnumber: "",
        flightNumber: null,
        seatNumber: null,
        wheelChair: "",
        withInfants: "",
        isCheckedin: "",
        colorCode: "",
        ansillary: [],
      },
    ],
    buttons: [],
    ancillary: [
      {
        id: "",
        name: "",
      },
    ],
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleShow = (event) => {
    const selectedId = event.target.id;
    this.setState({
      selectedId,
      show: true,
    });
  };

  dropDownHandler = async (event) => {
    console.log(event.target.value);

    let passanger = this.state.passenger
      .filter((x) => x.seatNumber == this.state.selectedId)
      .map((x) => {
        return { ...x, ansillary: [...x.ansillary, event.target.value] };
      });
    let response = await updateAnsillaryPassanger(passanger);
    this.setState({ passenger: response });

    this.foodPreference();
  };

  foodPreference() {
    const buttons = [];
    var seatNumber = this.state.passenger
      .filter((x) => x.ansillary.includes("Half-meals"))
      .map((x) => x.seatNumber);

    for (let i = 1; i <= this.props.flights[0].capacity; i++) {
      let seatColor = seatNumber.find((x) => x === i) ? "green" : "red";
      buttons.push(
        <div>
          <button
            key={i}
            className="btn btn-primary"
            style={{
              width: "60px",
              height: "40px",
              background: seatColor,
            }}
            id={i}
          >
            {i}
          </button>
          <br /> <br />
        </div>
      );
    }

    this.setState({ buttons });
  }
  async componentDidMount() {
    const passenger = await getPassengersByFlight(1);
    const ans = await getAnsillaryServiceByID(1);

    this.setState({
      passenger: passenger,
      ancillary: ans,
    });
    this.foodPreference();
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
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
                    value={this.state.selectedId}
                    readOnly
                  />
                </div>
                <div>
                  <label>Select Ansillary: </label>
                  <select
                    name="selectAnsillary"
                    onChange={this.dropDownHandler}
                    className="form-control"
                    style={{ width: "150px" }}
                  >
                    <option value="">select</option>
                    {this.state.ancillary.map((c) => {
                      return <option key={c.id}>{c.name}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="container-fluid">
          <div className=" outer row">
            <div className="col-2" style={{ padding: "10px" }}>
              {this.state.buttons}
            </div>
            <div className="col-10" style={{ padding: "2px" }}>
              <br />
              <Table striped bordered size="sm" style={{ background: "white" }}>
                <thead>
                  <tr>
                    <th>Seat No</th>
                    <th>PassangerName</th>
                    <th>Ansillary Service</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.passenger.map((x) => {
                    return (
                      <tr key={x.id}>
                        <td> {x.seatNumber}</td>
                        <td> {x.name}</td>
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
                            onClick={this.handleShow}
                          >
                            Add Service
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inflight_old;
