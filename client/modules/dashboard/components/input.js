import React from "react";

export default function Input(props) {
  const {field, extraClass, label, id, type, placeholder} = props;

  return (
    <div className={`test-field form-group ${field.touched && field.error && "has-error"} ${extraClass}`}>
      {label && <label htmlFor={id} className="control-label">{label}</label>}
      <input {...field} id={id} type={type} className="form-control" placeholder={placeholder} />
      {field.touched && field.error && <span className="test-error help-block">{field.error}</span>}
    </div>
  );
}

Input.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  extraClass: React.PropTypes.string
};
