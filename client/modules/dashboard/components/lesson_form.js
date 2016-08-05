import React from "react";
import Loader from "../components/loader";
import {reduxForm} from "redux-form";
import {Link} from "react-router";
import {notBlank, isDate} from "../services/validation";
import Input from "../components/input";

const validate = values => {
  const errors = {};

  notBlank(values, errors, "title");
  isDate(values, errors, "date");
  notBlank(values, errors, "date");
  notBlank(values, errors, "videoLink");

  return errors;
};

export class LessonForm extends React.Component {
  onLoaded() {
    const {from, fields: {title, date, videoLink, description}, handleSubmit, submitting, onSave} = this.props;

    return (
      <form onSubmit={handleSubmit(onSave)}>
        <Input field={title} label="Title" id="title" type="text" placeholder="Title" />
        <Input field={date} label="Released at" id="date" type="date" />
        <Input field={videoLink} label="YouTube link" id="videoLink" type="url" placeholder="https://www.youtube.com/embed/..." />
        <div className={`form-group ${description.touched && description.error && "has-error"}`}>
          <label htmlFor="description" className="control-label">Description</label>
          <textarea {...description} id="description" className="form-control" rows="3" />
          {description.touched && description.error && <span className="help-block">{description.error}</span>}
        </div>
        <button disabled={submitting} type="submit" className="btn btn-primary">Save</button>
        <Link to={from} className="btn btn-default margin-left__md">Cancel</Link>
      </form>
    );
  }
  render() {
    const {isFetching} = this.props;
    return <Loader flag={isFetching} onLoaded={this.onLoaded.bind(this)} />;
  }
}

LessonForm.propTypes = {
  from: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool,

  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool
};

export default reduxForm(
  {
    form: "lessonForm",
    fields: ["title", "date", "videoLink", "description"],
    validate
  },
  state => ({initialValues: state.lesson.item, isFetching: state.lesson.isFetching}),
  {}
)(LessonForm);
