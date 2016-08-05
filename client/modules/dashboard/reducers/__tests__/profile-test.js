import profile from "../profile";
import deepFreeze from "deep-freeze";
import {expect} from "chai";

describe("Reducer: location", () => {
  it("shouldn't pass state if unknown type", () => {
    const state = deepFreeze({});
    const action = deepFreeze({});

    profile(state, action);
  });

  describe("SIGN_OUT", () => {
    it("should reset state", () => {
      const state = deepFreeze({uid: "123"});
      const action = deepFreeze({type: "SIGN_OUT"});

      const newState = profile(state, action);

      expect(newState.uid).to.be.null;
    });
  });

  describe("SIGN_IN", () => {
    it("should reset state if error", () => {
      const state = deepFreeze({uid: "123"});
      const action = deepFreeze({type: "SIGN_IN", error: {}});

      const newState = profile(state, action);

      expect(newState.uid).to.be.null;
    });

    it("should store payload", () => {
      const state = deepFreeze({uid: null});
      const action = deepFreeze({type: "SIGN_IN", payload: {uid: "123"}});

      const newState = profile(state, action);

      expect(newState.uid).to.equal("123");
    });
  });

  describe("GET_PROFILE", () => {
    it("should reset state if error", () => {
      const state = deepFreeze({uid: "123"});
      const action = deepFreeze({type: "GET_PROFILE", error: {}});

      const newState = profile(state, action);

      expect(newState.uid).to.be.null;
    });

    it("should store payload", () => {
      const state = deepFreeze({uid: null});
      const action = deepFreeze({type: "GET_PROFILE", payload: {uid: "123"}});

      const newState = profile(state, action);

      expect(newState.uid).to.be.equal("123");
    });
  });
});
