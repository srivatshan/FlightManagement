import React, { Component } from "react";
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
import { connect } from "react-redux";

class Infligt extends React.Component {
  state = {
    selectedId: null,
    buttons: [],
    passenger: [],
    ancillary: [],
  };

  async componentDidMount() {
    const passenger = (
      await getPassengersByFlight(this.props.flightid)
    ).sort((a, b) => (a.seatNumber > b.seatNumber ? 1 : -1));

    const ans = await getAnsillaryServiceByID(this.props.flightid);

    this.setState({
      passenger: passenger,
      ancillary: ans,
    });
    this.foodPreference();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.flightid !== this.props.flightid) {
      const passenger = (
        await getPassengersByFlight(this.props.flightid)
      ).sort((a, b) => (a.seatNumber > b.seatNumber ? 1 : -1));
      console.log("passanger", passenger);
      const ans = await getAnsillaryServiceByID(this.props.flightid);
      this.setState({
        passenger: passenger,
        ancillary: ans,
      });
      this.foodPreference();
    }
  }

  RequestService = async (event) => {
    console.log(event.target.id);
    let passanger = this.state.passenger
      .filter((x) => x.seatNumber == event.target.id)
      .map((x) => {
        return { ...x, requestAnsillary: true };
      });
    let response = (await updateAnsillaryPassanger(passanger)).sort((a, b) =>
      a.seatNumber > b.seatNumber ? 1 : -1
    );
    this.setState({ passenger: response });
  };

  foodPreference() {
    const buttons = [];
    var seatNumber = this.state.passenger
      .filter((x) => x.ansillary.includes("Half-meals"))
      .map((x) => x.seatNumber);

    for (let i = 1; i <= this.props.flights[0]; i++) {
      let seatColor = seatNumber.find((x) => x == i) ? "green" : "red";
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
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className=" outer row">
            <div className="col-2" style={{ padding: "10px" }}>
              {this.state.buttons}
            </div>
            <div className="col-10" style={{ padding: "2px" }}>
              <br />
              <div
                style={{
                  position: "relative",
                  height: "400px",
                  overflow: "auto",
                }}
              >
                <Table
                  striped
                  bordered
                  size="sm"
                  style={{
                    background: "white",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Seat No</th>
                      <th>PassangerName</th>
                      <th>Requested Ansillary</th>
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
                          <td>{x.requestAnsillary == true ? "Yes" : "No"}</td>
                          <td>
                            {x.ansillary.map((y) => {
                              return <li key={y}>{y}</li>;
                            })}
                          </td>
                          <td>
                            <button
                              type="button"
                              id={x.seatNumber}
                              className="btn btn-primary btn-sm"
                              onClick={this.RequestService}
                            >
                              Request Service
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
      </>
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
export default connect(mapStateToProps)(Infligt);
