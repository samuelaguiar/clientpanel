import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsActions";

class Settings extends Component {
  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;

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
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="allowRegistration"
                  className="mr-2"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
                <label>Allow Registration</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  className="mr-2"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
                <label>Disable Balance On Add</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  className="mr-2"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
                <label>Disable Balance On Edit</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
