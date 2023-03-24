import React from "react";
import { Button, Table, Modal } from "react-bootstrap";
import TableFilter from "react-table-filter";
import {
  getPassengersByFlight,
  checkin_out_Passanger,
  updateAnsillaryPassanger,
} from "../../redux/actions/passangersAction";

class PassangerDetails extends React.Component {
  state = {
    show: false,
    updatedpassenger: [{}],
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
  };
  async componentDidMount() {
    const passenger = await getPassengersByFlight(this.props.flightId);

    this.setState(
      {
        passenger: passenger,
      },
      () => {
        this.tableFilterNode.reset(this.state.passenger, true);
      }
    );
  }
  _filterUpdated = (newData, filterConfiguration) => {
    this.setState({
      passenger: newData,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  saveChanges = async () => {
    let response = await updateAnsillaryPassanger(this.state.updatedpassenger);

    this.setState({
      show: false,
      passenger: response,
    });
  };
  handleShow = (event) => {
    const selectedId = event.target.id;

    this.setState(
      {
        selectedId,
        show: true,
        updatedpassenger: this.state.passenger
          .filter((x) => x.seatNumber == selectedId)
          .map((x) => {
            return x;
          }),
      },
      () => {
        console.log("updated passanger", this.state.updatedpassenger);
      }
    );
  };
  textHandler = (event) => {
    console.log(
      "pas details",
      this.state.passenger.map((x) =>
        x.seatNumber == this.state.selectedId
          ? { ...x, [event.target.name]: event.target.value }
          : x
      )
    );

    this.setState({
      updatedpassenger: this.state.updatedpassenger.map((x) =>
        x.seatNumber == this.state.selectedId
          ? { ...x, [event.target.name]: event.target.value }
          : x
      ),
    });
  };
  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div>
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
                  <label>Passport Number </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="passportnumber"
                    value={this.state.updatedpassenger[0].passportnumber}
                    onChange={this.textHandler}
                  />
                </div>
                <div>
                  <label>Address </label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="address"
                    value={this.state.updatedpassenger[0].address}
                    onChange={this.textHandler}
                  />
                </div>
                <div>
                  <label>DOB </label>
                  <input
                    className="form-control form-control-sm"
                    name="dateOfBirth"
                    type="text"
                    value={this.state.updatedpassenger[0].dateOfBirth}
                    onChange={this.textHandler}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered size="sm" style={{ background: "white" }}>
          <thead>
            <TableFilter
              rows={this.state.passenger}
              onFilterUpdate={this._filterUpdated}
              initialFilters={this.state.filterConfiguration}
              ref={(node) => {
                this.tableFilterNode = node;
              }}
            >
              <th>Id</th>
              <th>Name</th>
              <th>Seat No.</th>

              <th filterkey="passportnumber">Passport No. </th>
              <th filterkey="address">Address </th>
              <th filterkey="dateOfBirth">Dob </th>
              <th>Ansillary</th>
              <th></th>
            </TableFilter>
          </thead>

          <tbody>
            {this.state.passenger.map((x) => {
              return (
                <tr key={x.id}>
                  <td> {x.id}</td>
                  <td> {x.name}</td>
                  <td> {x.seatNumber}</td>
                  <td>{x.passportnumber}</td>
                  <td>{x.address}</td>
                  <td>{x.dateOfBirth}</td>
                  <td>
                    {x.ansillary.map((y) => {
                      return <li key={y}>{y}</li>;
                    })}
                  </td>
                  <td>
                    <button
                      key={x.id}
                      className="btn btn-primary"
                      id={x.id}
                      onClick={this.handleShow}
                    >
                      Update Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default PassangerDetails;
