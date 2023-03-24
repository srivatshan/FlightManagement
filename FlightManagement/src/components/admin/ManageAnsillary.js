import React from "react";
import {
  getAnsillaryServiceByID,
  saveAnsillary,
  DeleteAnsillary,
} from "../../api/ansillaryApi";
import { Button, Modal, Table } from "react-bootstrap";

class ManageAnsillary extends React.Component {
  state = {
    show: false,
    selectedAnsi: [{}],
    ansillary: [{}],
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  async componentDidMount() {
    const ans = await getAnsillaryServiceByID(this.props.flightId);
    this.setState({ ansillary: ans }, () => {
      console.log("ans is ", this.state.ansillary);
    });
  }
  handleShow = (event) => {
    const selectedId = event.target.id;
    let ansi = this.state.ansillary
      .filter((x) => x.id == selectedId)
      .map((x) => {
        return x;
      });
    this.setState({ selectedAnsi: ansi, show: true }, () => {
      console.log("selected ansi", this.state.selectedAnsi);
    });
  };
  addService = () => {
    this.setState({
      show: true,
      selectedAnsi: [{ id: 0, name: "", flightId: "" }],
    });
  };
  saveChanges = async () => {
    console.log("selected ansi", this.state.selectedAnsi);
    let data1 = await saveAnsillary(this.state.selectedAnsi);

    let data = await getAnsillaryServiceByID(this.props.flightId);
    this.setState({ ansillary: data, show: false }, () => {
      console.log("after put ", this.state.ansillary);
    });
  };

  DeleteService = async (event) => {
    await DeleteAnsillary(
      this.state.ansillary.filter((x) => x.id == event.target.id).map((x) => x)
    );
    let data = await getAnsillaryServiceByID(this.props.flightId);
    this.setState({ ansillary: data });
  };

  textHandler = (event) => {
    let result;
    if (this.state.selectedAnsi[0].id != 0) {
      this.setState(
        {
          selectedAnsi: this.state.selectedAnsi
            //  .filter((x) => x.id === this.state.selectedId)
            .map((x) => {
              return { ...x, name: event.target.value };
            }),
        },
        () => {
          console.log("while update", this.state.selectedAnsi);
        }
      );
    } else {
      let data = [
        { id: 0, name: event.target.value, flightId: this.props.flightId },
      ];
      this.setState(
        {
          selectedAnsi: data,
        },
        () => {
          console.log("data", this.state.selectedAnsi);
        }
      );
    }
  };

  render() {
    const { flightId } = this.props;
    return (
      <>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={this.addService}
          >
            Add Service
          </button>
          <br />
          <br />
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.selectedAnsi[0].id == 0
                  ? "Add Details"
                  : "Update Details"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
                <div>
                  {this.state.selectedAnsi[0].id > 0 && (
                    <div>
                      <label>Selected Id</label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="id"
                        value={this.state.selectedAnsi[0].id}
                        onChange={this.textHandler}
                        readOnly
                      />
                    </div>
                  )}

                  <div>
                    <label>Name </label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="name"
                      value={
                        this.state.selectedAnsi.length == 1
                          ? this.state.selectedAnsi[0].name
                          : ""
                      }
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
              <tr>
                <th>Id</th>
                <th>Ansilary Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.ansillary.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td> {x.name}</td>

                    <td>
                      <button
                        type="button"
                        id={x.id}
                        className="btn btn-primary btn-sm"
                        onClick={this.handleShow}
                      >
                        Update Service
                      </button>
                      {"        "}

                      <button
                        type="button"
                        id={x.id}
                        className="btn btn-primary btn-sm"
                        onClick={this.DeleteService}
                      >
                        Delete Service
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
export default ManageAnsillary;
