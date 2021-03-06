import React, { Component, useContext } from "react";
import { Context } from "../context";
import { setUserSession } from "../utils/Common";
import Axios from "axios";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Loader from "react-loader-spinner";
import validator from "validator"

export class SignInPage extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      isLoading: false,
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    this.setState({ isLoading: true });
    e.preventDefault();
    const { settingState } = this.context;
    Axios.post("/login", {
      email: this.state.email,
      password: this.state.password,
    })
      .then((resp) => {
        if (resp.data.error) {
          this.setState({
            error: resp.data.error,
            password: "",
            isLoading: false,
          });
        } else {
          this.setState({ isLoading: false });
          setUserSession(resp.data.token, resp.data.user);
          settingState(true, resp.data.user.name, resp.data.user._id);
          this.props.history.push("/shortenurl");
        }
      })
      .catch((err) => this.setState({ error: err }));
  };

  componentWillUnmount() {
    this.setState({ name: "", email: "", password: "", error: "" });
  }

  render() {
    return (
      <div className="App-header text-center p-5">
        <h1 className="mb-3 signintext-css pt-5">Sign In</h1>
        <div className="my-2">
          <small className="text-danger text-center">{this.state.error}</small>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-inline">
            <label className="mx-2 label-css">E-mail :</label>
            <input
              type="email"
              name="email"
              required
              className="mx-2 form-control"
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="Enter your email"
            />
            {/* {
              validator.isEmail(this.state.email)?"":"Enter a valid Email!"
            } */}
          </div>
          <div className="form-group form-inline">
            <label className="mx-2 label-css">Password :</label>
            <input
              type="password"
              name="password"
              required
              onChange={this.handleChange}
              value={this.state.password}
              className="mx-2 form-control"
              placeholder="Enter the password"
            />
          </div>
            
          <button
            type="submit"
            className="text-center btn btn-outline-css px-4 my-2"
          >
            Sign In
          </button>
          <div className={this.state.isLoading ? "p-3" : "d-none"}>
            <Loader
              type="Oval"
              color="#45A29E"
              height={30}
              width={30}
              timeout={500000000}
            />
          </div>
          <div className="my-1">
            <p className="text-center">
              New here? <Link className="link-css" to={ROUTES.SIGN_UP}>Sign Up</Link>
            </p>
          </div>

          <div></div>
        </form>
      </div>
    );
  }
}

export default SignInPage;
