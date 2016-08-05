import React from "react";
import AttendantRow from "./attendant_row";

export default function AttendantTable(props) {
  const {attendants} = props;

  return (
    <table className="table table-striped vertical-align">
      <thead>
      <tr>
        <th>Name</th>
        <th className="text-right">Confirmation</th>
      </tr>
      </thead>
      <tbody>
      {attendants.map((attendant) => {
        return <AttendantRow {...attendant} key={attendant.id} className="test-row"/>;
      })}
      </tbody>
    </table>
  );
}

AttendantTable.propTypes = {
  attendants: React.PropTypes.array.isRequired
};
