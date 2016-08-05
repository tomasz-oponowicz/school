import * as lessons from "../services/lessons";
import {CREATE_LESSON, UPDATE_LOCAL_LESSON, UPDATE_LESSON, UPDATE_STATUS, GET_LESSON, GET_LESSONS, REMOVE_LESSON} from "../constants";
import {createAction} from "./utils";

export function resetLocalLesson() {
  return {type: UPDATE_LOCAL_LESSON, payload: {}};
}

export const createLesson = createAction(CREATE_LESSON, lessons.createLesson, {
  notice: "The lesson has been created.",
  to: "/lessons"
});

export const updateLesson = createAction(UPDATE_LESSON, lessons.updateLesson, {
  notice: "The lesson has been updated.",
  to: "/lesson/:id"
});

export const getLesson = createAction(GET_LESSON, lessons.getLesson, {
  notifyWhenStarted: true
});

export const getLessonsWithStatuses = createAction(GET_LESSONS, lessons.getLessonsWithStatuses, {
  notifyWhenStarted: true
});

export const updateStatus = createAction(UPDATE_STATUS, lessons.updateStatus);

export const removeLesson = createAction(REMOVE_LESSON, lessons.removeLesson, {
  notice: "The lesson has been deleted.",
  to: "/lessons"
});
