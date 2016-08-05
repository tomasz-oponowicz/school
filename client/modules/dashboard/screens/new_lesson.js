import React from "react";
import LessonForm from "../components/lesson_form";
import {createLesson, resetLocalLesson} from "../actions/lessons";
import {connect} from "react-redux";

class NewLesson extends React.Component {
  componentWillMount() {
    this.props.resetLocalLesson();
  }
  onCreate(data) {
    this.props.createLesson(data);
  }
  render() {
    return <LessonForm onSave={this.onCreate.bind(this)} from={"/lessons"} />;
  }
}

NewLesson.propTypes = {
  createLesson: React.PropTypes.func.isRequired,
  resetLocalLesson: React.PropTypes.func.isRequired
};

export default connect(
  state => ({}),
  {createLesson, resetLocalLesson}
)(NewLesson);
