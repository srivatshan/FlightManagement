import React from "react";
import { getCredentials } from "../../api/loginApi";
import Cookies from "universal-cookie";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useHistory } from "react-router-dom";
class LoginPage extends React.Component {
  state = {
    error: "",
    user: {
      userName: "",
      password: "",
    },
  };

  UserChangeHandler = (event) => {
    this.setState({
      user: Object.assign({}, this.state.user, {
        [event.target.name]: event.target.value,
      }),
    });
  };

  formSubmit = async (event) => {
    event.preventDefault();
    const res = await getCredentials(
      this.state.user.userName,
      this.state.user.password
    );
    console.log("result is ", res);
    if (res.length > 0) {
      this.setState({
        user: Object.assign({}, this.state.user, {
          userName: res[0].username,
          password: res[0].password,
        }),
      });
      const cookies = new Cookies();
      cookies.set("user", res, { path: "/" });
      this.props.history.push(`/`);
    } else {
      this.setState({ error: "Invalid UserName and Password" });
    }
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />

        <div className="auth-wrapper" style={{ position: "fixed" }}>
          <div className="auth-inner">
            <form onSubmit={this.formSubmit}>
              <h3>Sign In</h3>
              {this.state.error != "" && (
                <h10 style={{ color: "red" }}>{this.state.error}</h10>
              )}
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="UserName"
                  name="userName"
                  value={this.state.user.userName}
                  onChange={this.UserChangeHandler}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={this.state.user.password}
                  onChange={this.UserChangeHandler}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
