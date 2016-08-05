import * as users from "../services/users";
import {CREATE_USER, GET_USER, GET_USERS, UPDATE_USER} from "../constants";
import {createAction} from "./utils";

export const createUser = createAction(CREATE_USER, users.createUser, {
  notice: "The user has been created.",
  to: "/users"
});

export const getUser = createAction(GET_USER, users.getUser, {
  notifyWhenStarted: true
});

export const getUsers = createAction(GET_USERS, users.getUsers, {
  notifyWhenStarted: true
});

export const updateUser = createAction(UPDATE_USER, users.updateUser, {
  notice: "The user has been updated.",
  to: "/users"
});

