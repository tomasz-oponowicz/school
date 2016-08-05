import React from "react";
import AttendedButton from "./attended_button";
import {Link} from "react-router";

export default function LessonPanel(props) {
  const {id, title, date, description = "", status} = props;

  return (
    <div className="panel panel-default margin-top__lg">
      <div className="panel-heading">
        <div className="pull-right">
          <AttendedButton className="test-button" lessonId={id} status={status} extraClass="btn-xs"/>
        </div>
        <Link className="test-title" to={`/lesson/${id}`}>{title}</Link>
      </div>
      <div className="panel-body">
        <p className="text-muted">
          <small className="test-date">Released at: {date}</small>
        </p>
        <p className="test-description">{description.substring(0, 90)}...</p>
      </div>
    </div>
  );
}

LessonPanel.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  status: React.PropTypes.string
};
