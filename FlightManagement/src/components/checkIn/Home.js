import React from "react";
import { connect } from "react-redux";
import * as flightsAction from "../../redux/actions/flightsAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import PartialView from "./PartialView";
import { Route, Router, Switch } from "react-router";
import PrivateRoute from "../common/PrivateRoute";
import { NavLink } from "react-router-dom";
import FlightDetails from "./FlightDetails";
import PageNotFound from "../../components/PageNotFound";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Inflight from "../inFlight/Inflight";

class Home extends React.Component {
  componentDidMount() {
    const { flights, actions } = this.props;
    if (flights.length === 0) {
      actions.loadFlights().catch((error) => {
        alert("loading Flights failer " + error);
      });
    }
  }

  state = {
    selectedTime: "",
    selectedFlight: "",
  };

  dropDownHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name == "selectedTime") {
      this.setState({ selectedFlight: "" });
    }
  };

  render() {
    const activeStyle = { color: "#F15B2A" };
    return (
      <>
        <div className="container-fluid">
          <div className=" outer row">
            <div style={{ padding: "5px 5px 5px 5px" }}>
              <br />
              <label>Select Time: </label>
              <select
                name="selectedTime"
                onChange={this.dropDownHandler}
                className="form-control"
                style={{ width: "150px" }}
              >
                <option value="">select</option>
                {this.props.flights.map((opt) => {
                  return <option key={opt.id}>{opt.time}</option>;
                })}
              </select>
            </div>
            <div style={{ padding: "5px 5px 5px 5px" }}>
              <br />
              <label>Select Flight: </label>
              <select
                name="selectedFlight"
                onChange={this.dropDownHandler}
                className="form-control"
                style={{ width: "150px" }}
              >
                <option value="">select</option>
                {this.props.flights
                  .filter((a) => a.time === this.state.selectedTime)
                  .map((c) => {
                    return <option key={c.id}>{c.name}</option>;
                  })}
              </select>
            </div>
          </div>
          <div>
            {this.state.selectedFlight != "" && (
              <div>
                <br />
                <Tabs>
                  <TabList>
                    <Tab>Check-In</Tab>
                    <Tab> In-Flight </Tab>
                  </TabList>

                  <TabPanel>
                    <FlightDetails
                      flights={this.props.flights.filter(
                        (x) => x.name === this.state.selectedFlight
                      )}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Inflight
                      flights={this.props.flights.filter(
                        (x) => x.name === this.state.selectedFlight
                      )}
                    />
                  </TabPanel>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  flights: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    flights: state.flights.length === 0 ? [] : state.flights,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadFlights: bindActionCreators(flightsAction.loadFlights, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
