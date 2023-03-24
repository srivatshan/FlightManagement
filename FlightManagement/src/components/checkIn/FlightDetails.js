import React from "react";
import { Table } from "react-bootstrap";
import { getAnsillaryService } from "../../api/ansillaryApi";
import {
  getPassengersByFlight,
  checkin_out_Passanger,
} from "../../redux/actions/passangersAction";
import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";

class FlightDetails extends React.Component {
  state = {
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
    const data = await checkin_out_Passanger(passanger);

    this.setState({ passenger: data });
    this.doSomething();
  };
  filterHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      console.log(this.state.filterWheelchair);
    });
  };

  doSomething() {
    const buttons = [];
    for (let i = 1; i <= this.props.flights[0].capacity; i++) {
      var buttonColor = this.state.passenger
        .filter((x) => x.seatNumber === i)
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

  async componentDidMount() {
    const passenger = await getPassengersByFlight(1);
    const ans = await getAnsillaryService();

    this.setState(
      {
        passenger: passenger,
        ancillary: ans,
        data: passenger.map((x) => {
          return { id: x.id, name: x.name };
        }),
      },
      () => {
        this.tableFilterNode.reset(this.state.passenger, true);
      }
    );
    this.doSomething();
  }

  _filterUpdated = (newData, filterConfiguration) => {
    this.setState({
      passenger: newData,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className=" outer row">
          <div className="col-2" style={{ padding: "10px" }}>
            {this.state.buttons}
          </div>
          <div className="col-10" style={{ padding: "2px" }}>
            <h6 style={{ color: "Red" }}>Flight Details </h6>

            <Table striped bordered size="sm" style={{ background: "white" }}>
              <thead>
                <tr>
                  <th>Flight Id</th>
                  <th>Flight Name</th>
                  <th>Flight Time</th>
                  <th>Total Capacity</th>
                </tr>
              </thead>
              <tbody>
                {this.props.flights.map((x) => {
                  return (
                    <tr key={x.id}>
                      <td> {x.id}</td>
                      <td> {x.name}</td>
                      <td> {x.time}</td>
                      <td> {x.capacity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <div>
              {" "}
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
                    <th filterkey="isCheckedin">IsCheckedin </th>
                    <th filterkey="wheelChair">WheelChair </th>
                    <th filterkey="withInfants">WithInfants </th>
                    <th>Ansillary</th>
                  </TableFilter>
                </thead>

                <tbody>
                  {this.state.passenger.map((x) => {
                    return (
                      <tr key={x.id}>
                        <td> {x.id}</td>
                        <td> {x.name}</td>
                        <td> {x.seatNumber}</td>
                        <td>{x.isCheckedin}</td>
                        <td>{x.wheelChair}</td>
                        <td>{x.withInfants}</td>
                        <td>
                          {x.ansillary.map((y) => {
                            return <li key={y}>{y}</li>;
                          })}
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

export default FlightDetails;
