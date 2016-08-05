import React from "react";
import {connect} from "react-redux";

export function Flash(props) {
  const {isError, message} = props.flash;

  if (!message) {
    return <p />;
  }

  const className = isError ? "alert-danger" : "alert-success";

  return <p className={"alert " + className}>{message}</p>;
}

Flash.propTypes = {
  flash: React.PropTypes.object.isRequired
};

export default connect(
  state => ({flash: state.flash}),
  {}
)(Flash);
