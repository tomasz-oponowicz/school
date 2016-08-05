import React from "react";
import LessonPanel from "../components/lesson_panel";
import {Link} from "react-router";
import PrivilegedSection from "../components/privileged_section";
import {connect} from "react-redux";
import {getLessonsWithStatuses} from "../actions/lessons";
import Loader from "../components/loader";

class Lessons extends React.Component {
  componentWillMount() {
    this.props.getLessonsWithStatuses(this.props.profile.uid);
  }
  onLoaded() {
    const {items} = this.props.lessons;

    return items.map(item => {
      return <LessonPanel {...item} key={item.id} />;
    });
  }
  render() {
    const {isFetching} = this.props.lessons;

    return (
      <div>
        <PrivilegedSection roles={["teacher", "admin"]}>
          <Link to="/lesson/new" className="btn btn-sm btn-default pull-left">Create lesson</Link>
        </PrivilegedSection>
        <p className="text-muted text-right margin-bottom__md">Sorted by <i>Released at</i> (desc)</p>
        <div className="clearfix">
          <Loader flag={isFetching} onLoaded={this.onLoaded.bind(this)} />
        </div>
      </div>
    );
  }
}

Lessons.propTypes = {
  profile: React.PropTypes.object.isRequired,
  lessons: React.PropTypes.object.isRequired,
  getLessonsWithStatuses: React.PropTypes.func.isRequired
};

export default connect(
  state => ({lessons: state.lessons, profile: state.profile}),
  {getLessonsWithStatuses}
)(Lessons);
