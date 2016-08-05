import React from "react";

export default function Loader(props) {
  const {flag, onLoaded} = props;

  if (flag) {
    return <div className="loader">Loading...</div>;
  } else {
    return <div>{onLoaded()}</div>;
  }
}

Loader.propTypes = {
  onLoaded: React.PropTypes.func.isRequired,
  flag: React.PropTypes.bool
};
