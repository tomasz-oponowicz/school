export function notBlank(values, errors, key) {
  if (!values[key]) {
    errors[key] = "Required";
  }
}

export function isDate(values, errors, key) {
  const value = values[key];
  if (Number.isNaN(Date.parse(value))) {
    errors[key] = "Invalid format";
  }
}

export function equalsTo(values, errors, key, reference) {
  if (values[key] !== reference) {
    errors[key] = "No match";
  }
}
