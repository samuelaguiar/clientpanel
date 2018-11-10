import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  // Update balance
  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    // Update in firestore
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };

  // Delete client
  onDeleteClick = async () => {
    const { client, firestore, history } = this.props;

    await firestore.delete({
      collection: "clients",
      doc: client.id
    });

    return history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    // If balance form should display
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit} className="mt-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-secondary text-dark"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-secondary"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left mr-2" />
                Back To Dashboard
              </Link>
            </div>
            <div className="col-sm-6">
              <div className="btn-group float-right">
                <Link
                  to={`/client/edit/${client.id}`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr className="border-secondary" />
          <div className="card">
            <h4 className="card-header">
              {client.firstName} {client.lastName}
            </h4>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h5>
                    Client ID: <span className="text-dark">{client.id}</span>
                  </h5>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h5>
                    Balance:{" "}
                    <span
                      className={classnames({
                        "bg-danger text-white p-1 mx-1": client.balance > 0,
                        "bg-success text-white p-1 mx-1": client.balance === 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt text-dark" />
                      </a>
                    </small>
                  </h5>
                  {balanceForm}
                </div>
              </div>
              <hr className="border-secondary" />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
