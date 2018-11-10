import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  componentWillMount() {
    const { allowRegistration } = this.props.settings;
    if (!allowRegistration) {
      this.props.history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    // Register with firebase
    firebase
      .createUser({ email, password })
      .catch(e => notifyUser("That User Already Exists", "error"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div className="row">
        <div className="col-lg-6 col-md-10 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center pb-4 pt-3">
                <i className="text-info fas fa-user-plus mr-2" />
                Register
              </h2>
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control bg-light border-secondary text-dark"
                    name="email"
                    value={this.state.email}
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control bg-light border-secondary text-dark"
                    name="password"
                    value={this.state.password}
                    required
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-info btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
