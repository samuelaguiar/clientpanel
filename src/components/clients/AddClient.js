import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onSubmit = async e => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore, history } = this.props;
    // If no balance, make 0
    if (newClient.balance === "") newClient.balance = 0;

    firestore.add({ collection: "clients" }, newClient);

    return history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left mr-2" />
              Back To Dashboard
            </Link>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control bg-light border-secondary text-dark"
                  name="firstName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                  placeholder="Type your first name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control bg-light border-secondary text-dark"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                  placeholder="Type your last name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control bg-light border-secondary text-dark"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  placeholder="Type your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control bg-light border-secondary text-dark"
                  name="phone"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                  placeholder="Type your phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className={classnames(
                    "form-control border-secondary text-dark",
                    {
                      "bg-light": disableBalanceOnAdd === false,
                      "bg-secondary": disableBalanceOnAdd === true
                    }
                  )}
                  name="balance"
                  onChange={this.onChange}
                  value={this.state.balance}
                  placeholder="Type the balance"
                  disabled={disableBalanceOnAdd}
                />
              </div>

              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
