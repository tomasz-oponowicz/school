import React from "react";
import {connect} from "react-redux";
import {updateStatus} from "../actions/lessons";

export class AttendedButton extends React.Component {
  onClick() {
    const {lessonId, profile: {uid, role}, updateStatus} = this.props;
    updateStatus(lessonId, uid, uid, "pending", ["teacher", "admin"].lastIndexOf(role) >= 0);
  }
  render() {
    const {status, extraClass} = this.props;

    let className = "";

    if (extraClass) {
      className += `${extraClass} `;
    }

    switch (status) {
    case "pending":
      className += "btn-info ";
      break;
    case "confirmed":
      className += "btn-success ";
      break;
    case "rejected":
      className += "btn-danger ";
      break;
    default:
      className += "btn-default ";
      break;
    }

    return (
      <button onClick={this.onClick.bind(this)} className={"btn " + className}
              type="button" data-toggle="tooltip" data-placement="bottom" title={status}>
        <span className="glyphicon glyphicon-ok" aria-hidden="true" /> Attended
      </button>
    );
  }
}

AttendedButton.propTypes = {
  lessonId: React.PropTypes.string.isRequired,
  profile: React.PropTypes.object.isRequired,
  updateStatus: React.PropTypes.func.isRequired,
  status: React.PropTypes.string,
  extraClass: React.PropTypes.string
};

export default connect(
  state => ({profile: state.profile}),
  {updateStatus}
)(AttendedButton);
