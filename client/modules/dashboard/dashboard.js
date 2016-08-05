import React from "react";
import {render} from "react-dom";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {Router, Route, Redirect, IndexRedirect, browserHistory} from "react-router";
import {navigateTo} from "./actions/location";
import thunk from "redux-thunk";
import * as screens from "./screens";
import * as reducers from "./reducers";
import Layout from "./layout";
import {DEFAULT_PATH, LOGIN_PATH} from "./constants";
import {authenticate} from "./services/authentication";
import {getProfile} from "./actions/authentication";

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

browserHistory.listen((event) => {
  const {current} = store.getState().location;

  if (current !== event.pathname) {
    store.dispatch(navigateTo(event.pathname));
  }
});

store.subscribe(() => {
  const {current} = store.getState().location;

  if (current !== window.location.pathname) {
    browserHistory.push(current);
  }
});

function onAuthenticate(nextState, transition, callback) {
  if (store.getState().profile.uid) {
    return callback();
  }

  authenticate()
    .then((payload) => {
      store.dispatch(getProfile(payload));
      callback();
    })
    .catch(() => {
      transition(LOGIN_PATH);
      callback();
    });
}

function authorize(roles) {
  return (nextState, transition) => {
    if (roles.lastIndexOf(store.getState().profile.role) === -1) {
      transition(DEFAULT_PATH);
    }
  };
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRedirect to={DEFAULT_PATH} />
        <Route path={LOGIN_PATH} component={screens.SignIn}/>
        <Route path="signup" component={screens.SignUp}/>
        <Route onEnter={onAuthenticate}>
          <Route path="profile" component={screens.Profile}/>
          <Route onEnter={authorize(["admin"])}>
            <Route path="user/new" component={screens.NewUser}/>
            <Route path="user/:id/edit" component={screens.EditUser}/>
            <Route path="users" component={screens.Users}/>
          </Route>
          <Route onEnter={authorize(["teacher", "admin"])}>
            <Route path="lesson/new" component={screens.NewLesson}/>
            <Route path="lesson/:id/edit" component={screens.EditLesson}/>
          </Route>
          <Route path="lesson/:id" component={screens.ShowLesson}/>
          <Route path="lessons" component={screens.Lessons}/>
        </Route>
        <Redirect from="*" to={DEFAULT_PATH} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
