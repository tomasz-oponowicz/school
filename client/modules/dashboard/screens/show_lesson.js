import React from "react";
import AttendedButton from "../components/attended_button";
import AttendantTable from "../components/attendant_table";
import {Link} from "react-router";
import PrivilegedSection from "../components/privileged_section";
import {getLesson, removeLesson} from "../actions/lessons";
import {connect} from "react-redux";
import Loader from "../components/loader";

class ShowLesson extends React.Component {
  componentWillMount() {
    const {params: {id}, profile: {uid, role}, getLesson} = this.props;
    getLesson(id, uid, ["teacher", "admin"].lastIndexOf(role) >= 0);
  }
  onRemove() {
    if (confirm("Delete?")) {
      this.props.removeLesson(this.props.params.id);
    }
  }
  onLoaded() {
    const {
      params: {id},
      lesson: {
        item: {title, date, videoLink, description, status, attendants}
      },
      profile: {uid}
    } = this.props;

    return (
      <div>
        <Link to="/lessons" className="btn btn-sm btn-default">
          <span className="glyphicon glyphicon-menu-left"/> Back
        </Link>
        <div className="pull-right">
          <AttendedButton lessonId={id} userId={uid} status={status} extraClass="btn-sm"/>
          <PrivilegedSection roles={["teacher", "admin"]}>
            <Link to={`/lesson/${id}/edit`} className="btn btn-sm btn-default margin-left__md">
              Edit
            </Link>
            <button onClick={this.onRemove.bind(this)} type="button" className="btn btn-sm btn-danger margin-left__md">
              Delete
            </button>
          </PrivilegedSection>
        </div>
        <h1>{title}</h1>
        <p className="text-muted"><small>Released at: {date}</small></p>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={videoLink} allowFullScreen></iframe>
        </div>
        <p className="margin-top__lg">{description}</p>
        <PrivilegedSection roles={["teacher", "admin"]}>
          <h3>Attendants</h3>
          <AttendantTable attendants={attendants} />
        </PrivilegedSection>
      </div>
    );
  }
  render() {
    return <Loader flag={this.props.lesson.isFetching} onLoaded={this.onLoaded.bind(this)} />;
  }
}

ShowLesson.propTypes = {
  lesson: React.PropTypes.object.isRequired,
  profile: React.PropTypes.object.isRequired,
  getLesson: React.PropTypes.func.isRequired,
  removeLesson: React.PropTypes.func.isRequired
};

export default connect(
  state => ({lesson: state.lesson, profile: state.profile}),
  {getLesson, removeLesson}
)(ShowLesson);
