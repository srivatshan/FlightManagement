import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import {
  getPassengersByFlight,
  checkin_out_Passanger,
  updateAnsillaryPassanger,
} from "../../redux/actions/passangersAction";
import { getAnsillaryService } from "../../api/ansillaryApi";
import TableFilter from "react-table-filter";
import { connect } from "react-redux";

class PassangerDetails extends React.Component {
  state = {
    seatPreferedId: 0,
    show: false,
    passenger: [],
    buttons: [],
    ancillary: [],
    seats: [],
  };
  handleShow = (event) => {
    const selectedId = event.target.id;
    var seat = [];
    for (var i = 1; i <= this.props.flights[0]; i++) {
      if (i != selectedId) seat.push(i);
    }
    this.setState({
      selectedId,
      show: true,
      seats: seat,
    });
  };

  seatPreferenceHandler = (event) => {
    this.setState({ seatPreferedId: event.target.value });
  };

  passangerColorCode() {
    const buttons = [];
    for (let i = 1; i <= this.props.flights[0]; i++) {
      var buttonColor = this.state.passenger
        .filter((x) => x.seatNumber == i)
        .map((x) => x.colorCode);
      if (buttonColor.length == 0) buttonColor = "red";

      buttons.push(
        <div>
          <button
            key={i}
            className="btn btn-primary"
            style={{
              width: "60px",
              height: "40px",
              background: buttonColor,
            }}
            id={i}
            onClick={this.buttonHandler}
          >
            {i}
          </button>
          <br /> <br />
        </div>
      );
    }
    this.setState({ buttons });
  }
  buttonHandler = async (event) => {
    const { id } = event.target;
    if (this.state.passenger.filter((x) => x.seatNumber == id).length == 0) {
      alert("seat not allocated");
      return;
    }

    const passanger = this.state.passenger
      .filter((x) => x.seatNumber == id)
      .map((x) => {
        let status = x.isCheckedin == "Yes" ? "No" : "Yes";
        return { ...x, isCheckedin: status };
      });
    const data = (await checkin_out_Passanger(passanger)).sort((a, b) =>
      a.seatNumber > b.seatNumber ? 1 : -1
    );

    this.setState({ passenger: data });
    this.passangerColorCode();
  };
  async componentDidUpdate(prevProps) {
    console.log("componentDidUpdate is ", this.props.flightid);
    if (prevProps.flightid !== this.props.flightid) {
      const passenger = (
        await getPassengersByFlight(this.props.flightid)
      ).sort((a, b) => (a.seatNumber > b.seatNumber ? 1 : -1));
      const ans = await getAnsillaryService();
      this.setState(
        {
          passenger: passenger,
          ancillary: ans,
        },
        () => {
          if (this.props.flightid !== 0)
            this.tableFilterNode.reset(this.state.passenger, true);
        }
      );
      this.passangerColorCode();
    }
  }

  async componentDidMount() {
    const passenger = (
      await getPassengersByFlight(this.props.flightid)
    ).sort((a, b) => (a.seatNumber > b.seatNumber ? 1 : -1));
    const ans = await getAnsillaryService();

    this.setState(
      {
        passenger: passenger,
        ancillary: ans,
      },
      () => {
        if (this.props.flightid !== 0)
          this.tableFilterNode.reset(this.state.passenger, true);
      }
    );
    this.passangerColorCode();
  }
  saveSeatHandler = async () => {
    let data = (await getPassengersByFlight(this.props.flightid)).filter(
      (x) => x.seatNumber == this.state.selectedId
    );
    data[0].seatNumber = this.state.seatPreferedId;
    const data1 = (await getPassengersByFlight(this.props.flightid)).filter(
      (x) => x.seatNumber == this.state.seatPreferedId
    );
    let res1 = await updateAnsillaryPassanger(data);
    if (data1.length > 0) {
      data1[0].seatNumber = this.state.selectedId;
      res1 = await updateAnsillaryPassanger(data1);
    }

    res1 = res1.sort((a, b) => (a.seatNumber > b.seatNumber ? 1 : -1));
    this.setState({ passenger: res1, show: false });
    this.passangerColorCode();
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  _filterUpdated = (newData, filterConfiguration) => {
    this.setState({
      passenger: newData,
    });
  };
  render() {
    const flightId = this.props.flightid;
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Seat Preference</Modal.Title>
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
                {"   "}
                <div style={{ paddingLeft: "20px" }}>
                  <label>Alternative Seat No: </label>
                  <select
                    name="selectAnsillary"
                    className="form-control"
                    style={{ width: "150px" }}
                    onChange={this.seatPreferenceHandler}
                  >
                    <option value="">select</option>
                    {this.state.seats.map((c) => {
                      return <option key={c}>{c}</option>;
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
            <Button variant="primary" onClick={this.saveSeatHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {flightId !== 0 && (
          <div className="container-fluid">
            <div className=" outer row">
              <div className="col-2" style={{ padding: "10px" }}>
                {this.state.buttons}
              </div>
              <div className="col-10" style={{ padding: "2px" }}>
                <div>
                  <Table
                    striped
                    bordered
                    size="sm"
                    style={{ background: "white" }}
                  >
                    <thead>
                      <TableFilter
                        rows={this.state.passenger}
                        onFilterUpdate={this._filterUpdated}
                        initialFilters={this.state.filterConfiguration}
                        ref={(node) => {
                          this.tableFilterNode = node;
                        }}
                      >
                        <th>Seat No.</th>
                        <th>Name</th>

                        <th filterkey="isCheckedin">IsCheckedin </th>
                        <th filterkey="wheelChair">WheelChair </th>
                        <th filterkey="withInfants">WithInfants </th>
                        <th>Ansillary</th>
                        <th></th>
                      </TableFilter>
                    </thead>

                    <tbody>
                      {this.state.passenger.map((x) => {
                        return (
                          <tr key={x.seatNumber}>
                            <td> {x.seatNumber}</td>
                            <td> {x.name}</td>

                            <td>{x.isCheckedin}</td>
                            <td>{x.wheelChair}</td>
                            <td>{x.withInfants}</td>
                            <td>
                              {x.ansillary.map((y) => {
                                return <li key={y}>{y}</li>;
                              })}
                            </td>
                            <td>
                              <button
                                type="button"
                                id={x.seatNumber}
                                key={x.seatNumber}
                                className="btn btn-primary btn-sm"
                                onClick={this.handleShow}
                              >
                                Change Seat
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
        )}
      </div>
    );
  }
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

export default connect(mapStateToProps)(PassangerDetails);
