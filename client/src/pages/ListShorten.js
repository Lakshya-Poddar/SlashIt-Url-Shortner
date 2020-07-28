import React, { Component } from "react";
import { getToken } from "../utils/Common";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import axios from "axios";
import Loader from "react-loader-spinner";

export class ListShorten extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/shorten/list", {
        headers: { "auth-shorten-token": getToken() },
      })
      .then((resp) => {
        this.setState({ items: resp.data, isLoading: false });
      })
      .catch((err) => console.log("err", err));
  }

  componentWillUnmount() {
    this.setState({ items: [] });
  }

  render() {
    if (!getToken())
      return (
        <div className="App-header text-center">
          <h1>
            You are not <span className="text-danger"> logged in</span>.
          </h1>
          <span>
            <Link to={ROUTES.SIGN_IN}>
              <button className="text-center m-2 btn btn-outline-danger mt-3">
                Sign In
              </button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
              <button className="text-center m-2 btn btn-outline-danger mt-3">
                Sign Up
              </button>
            </Link>
          </span>
        </div>
      );
    return (
      <>
        <div className={this.state.isLoading ? "App-header" : "d-none"}>
          <Loader
            type="Oval"
            color="gray"
            height={50}
            width={50}
            timeout={500000000}
          />
        </div>
        <div className="container  pt-3 pt-md-5 mt-5 pb-2">
          <div className="list-group   w-100 mx-auto">
          {this.state.items.length===0?<p className="text-center">NO ITEMS FOUND</p>:this.state.items.reverse().map((item) => (
              <EachItem key={item._id} hash={item.hashed} url={item.longUrl} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

const EachItem = ({ hash, url }) => (
  <div className="list-group-item list-group-item-action flex-column align-items-center active bg-light ">
    <div className="row">
      <div className="col-12 col-md-5 col-lg-5">
        <a
          href={`https://siui.herokuapp.com/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-1 list-style"
        >{`https://siui.herokuapp.com/${hash}`}</a>
      </div>
      <div className="col-12 col-md-5 col-lg-5 ">
        <p className="mb-1 text-muted">{`URL : ${url}`}</p>
      </div>
      <div className="col-12 col-md-2 col-lg-2 text-secondary">
        <p>{`HASH : ${hash}`}</p>
      </div>
    </div>
  </div>
);

export default ListShorten;
