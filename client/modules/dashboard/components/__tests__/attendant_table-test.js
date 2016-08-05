import React from "react";
import AttendantTable from "../attendant_table";
import {expect} from "chai";
import {shallow} from "enzyme";

describe("Component: AttendantTable", () => {
  it("should render a table", () => {
    const props = {
      attendants: [
        {id: "111-111"},
        {id: "222-222"},
        {id: "333-333"}
      ]
    };
    const wrapper = shallow(<AttendantTable {...props} />);

    expect(wrapper.find(".test-row").length).to.equal(3);
  });

  it("should render an empty table if no attendants", () => {
    const props = {
      attendants: []
    };
    const wrapper = shallow(<AttendantTable {...props} />);

    expect(wrapper.find(".test-row").length).to.equal(0);
  });
});
