import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

export function TabLink(props) {
  const {location: {current}, to, children} = props;
  const className = current === to ? "active" : "";

  return (
    <li role="presentation" className={className}><Link to={to}>{children}</Link></li>
  );
}

TabLink.propTypes = {
  location: React.PropTypes.object.isRequired,
  to: React.PropTypes.string.isRequired
};

export default connect(
  state => ({location: state.location}),
  {}
)(TabLink);
