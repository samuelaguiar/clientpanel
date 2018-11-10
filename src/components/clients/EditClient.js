import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);

    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = async e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    // Updated Client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    // Update client in firestore
    firestore.update({ collection: "clients", doc: client.id }, updClient);

    return history.push("/");
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
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
            <div className="card-header">Edit Client</div>
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
                    defaultValue={client.firstName}
                    ref={this.firstNameInput}
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
                    defaultValue={client.lastName}
                    ref={this.lastNameInput}
                    placeholder="Type your last name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control bg-light border-secondary text-dark"
                    name="email"
                    defaultValue={client.email}
                    ref={this.emailInput}
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
                    defaultValue={client.phone}
                    ref={this.phoneInput}
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
                        "bg-light": disableBalanceOnEdit === false,
                        "bg-secondary": disableBalanceOnEdit === true
                      }
                    )}
                    name="balance"
                    defaultValue={client.balance}
                    ref={this.balanceInput}
                    placeholder="Type the balance"
                    disabled={disableBalanceOnEdit}
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
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
