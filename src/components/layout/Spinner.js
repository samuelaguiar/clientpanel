import React, { Component } from "react";

class Spinner extends Component {
  render() {
    return (
      <div className="container text-center mt-3">
        <i className="fas fa-spinner fa-spin" style={{ fontSize: 40 }} />
      </div>
    );
  }
}

export default Spinner;
