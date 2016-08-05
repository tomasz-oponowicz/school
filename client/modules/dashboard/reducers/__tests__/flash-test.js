import flash from "../flash";
import deepFreeze from "deep-freeze";
import {expect} from "chai";

describe("Reducer: flash", () => {
  it("shouldn't pass state if unknown type", () => {
    const state = deepFreeze({});
    const action = deepFreeze({});

    flash(state, action);
  });

  describe("SHOW_FLASH", () => {
    it("should store payload", () => {
      const state = deepFreeze({message: "foo"});
      const action = deepFreeze({type: "SHOW_FLASH", payload: {message: "bar"}});

      const newState = flash(state, action);

      expect(newState).to.equal(action.payload);
    });
  });

  describe("NAVIGATE_TO", () => {
    it("should decrease counter", () => {
      const state = deepFreeze({transitions: 1});
      const action = deepFreeze({type: "NAVIGATE_TO"});

      const newState = flash(state, action);

      expect(newState.transitions).to.equal(0);
    });

    it("should reset counter if zero", () => {
      const state = deepFreeze({transitions: 0});
      const action = deepFreeze({type: "NAVIGATE_TO"});

      const newState = flash(state, action);

      expect(newState.transitions).to.be.undefined;
    });
  });
});
