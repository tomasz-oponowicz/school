import * as authentication from "../services/authentication";
import {DEFAULT_PATH, LOGIN_PATH, GET_PROFILE, SIGN_IN, SIGN_OUT, CHANGE_PASSWORD} from "../constants";
import {createAction} from "./utils";
import {showNotice, showAlert} from "../actions/flash";
import * as users from "../services/users";

export function getProfile(payload) {
  return {type: GET_PROFILE, payload};
}

export const signIn = createAction(SIGN_IN, authentication.signIn, {
  to: DEFAULT_PATH
});

export const signUp = createAction(SIGN_IN, authentication.signUp, {
  to: DEFAULT_PATH
});

export const signOut = createAction(SIGN_OUT, authentication.signOut, {
  notice: "You have been signed out.",
  to: LOGIN_PATH
});

export function updateProfile(id, user, withRole) {
  return (dispatch) => {
    users.updateUser(id, user, withRole)
      .then(() => {
        return authentication.getProfile(id);
      })
      .then(profile => {
        dispatch(getProfile(profile));
        dispatch(showNotice("The profile has been updated.", 0));
      })
      .catch(error => {
        dispatch(showAlert(error.message));
      });
  };
}

export const changePassword = createAction(CHANGE_PASSWORD, authentication.changePassword, {
  notice: "The password has been changed.",
  transitions: 0
});
