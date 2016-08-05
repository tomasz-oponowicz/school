import React from "react";
import {connect} from "react-redux";
import {updateStatus} from "../actions/lessons";

export class AttendantRow extends React.Component {
  onAction(status) {
    const {lesson, id: attendantId, profile: {uid}, updateStatus} = this.props;
    updateStatus(lesson.item.id, attendantId, uid, status, true);
  }
  render() {
    const {name, status} = this.props;
    const confirmClass = status === "confirmed" ? "active btn-success" : "btn-default";
    const rejectClass = status === "rejected" ? "active btn-danger" : "btn-default";

    return (
      <tr>
        <td className="test-name">{name}</td>
        <td className="text-right">
          <div className="btn-group" role="group" aria-label="confirm">
            <button onClick={() => this.onAction("confirmed")} className={`test-confirm btn btn-sm ${confirmClass}`} type="button" >
              <span className="glyphicon glyphicon-ok" aria-hidden="true" /> Confirm
            </button>
            <button onClick={() => this.onAction("rejected")} className={`test-reject btn btn-sm ${rejectClass}`} type="button">
              <span className="glyphicon glyphicon-remove" aria-hidden="true" /> Reject
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

AttendantRow.propTypes = {
  id: React.PropTypes.string.isRequired,
  lesson: React.PropTypes.object.isRequired,
  profile: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  status: React.PropTypes.string,
  updateStatus: React.PropTypes.func.isRequired
};

export default connect(
  state => ({lesson: state.lesson, profile: state.profile}),
  {updateStatus}
)(AttendantRow);
