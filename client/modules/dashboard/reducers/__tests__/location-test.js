import location from "../location";
import deepFreeze from "deep-freeze";
import {expect} from "chai";

describe("Reducer: location", () => {
  it("shouldn't pass state if unknown type", () => {
    const state = deepFreeze({});
    const action = deepFreeze({});

    location(state, action);
  });

  describe("NAVIGATE_TO", () => {
    it("should store new location", () => {
      const state = deepFreeze({current: "foo"});
      const action = deepFreeze({type: "NAVIGATE_TO", payload: {to: "bar"}});

      const newState = location(state, action);

      expect(newState.current).to.equal("bar");
    });

    it("should update previous location", () => {
      const state = deepFreeze({current: "foo"});
      const action = deepFreeze({type: "NAVIGATE_TO", payload: {to: "bar"}});

      const newState = location(state, action);

      expect(newState.previous).to.equal("foo");
    });
  });
});
