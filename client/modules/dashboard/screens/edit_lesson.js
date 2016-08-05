import React from "react";
import LessonForm from "../components/lesson_form";
import {updateLesson, getLesson} from "../actions/lessons";
import {connect} from "react-redux";

class EditLesson extends React.Component {
  componentWillMount() {
    const {params: {id}, profile: {uid}, getLesson} = this.props;
    getLesson(id, uid);
  }
  onUpdate(data) {
    const {updateLesson, params: {id}} = this.props;
    updateLesson(id, data);
  }
  render() {
    return <LessonForm onSave={this.onUpdate.bind(this)} from={`/lesson/${this.props.params.id}`} />;
  }
}

EditLesson.propTypes = {
  profile: React.PropTypes.object.isRequired,
  updateLesson: React.PropTypes.func.isRequired,
  getLesson: React.PropTypes.func.isRequired
};

export default connect(
  state => ({profile: state.profile}),
  {updateLesson, getLesson}
)(EditLesson);
