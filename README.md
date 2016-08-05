# School

[![Build Status](https://travis-ci.org/simkimsia/UtilityBehaviors.png)](https://travis-ci.org/tomasz-oponowicz/school)

Visit the demo page: 

    https://radiant-inferno-2296.firebaseapp.com

## Features

* Student
  * Sign in / Sign up / Sign out;
  * Display lessons / lesson;
  * Attend lesson;
  * Edit profile / Change password;
* Teacher (superset of the student role)
  * Create / Edit / Delete lesson;
  * Confirm / Reject students requests;
* Admin (superset of the teacher role)
  * Display users / user;
  * Create / Edit user;
  * Set role of user;

## Sample accounts

| Email                  | Password |   Role  |
|------------------------|----------|:-------:|
| admin@mailinator.com   | admin    |  admin  |
| teacher@mailinator.com | teacher  | teacher |
| student@mailinator.com | student  | student |
| david@mailinator.com   | david    | student |
| donnie@mailinator.com  | donnie   | student |
| edith@mailinator.com   | edith    | student |

## Build

1. Install dependencies:

        $ npm install

1. Build the application:

        $ npm run build

## Run

1. Start the web server:

        $ npm start

1. Open the landing page:

        http://localhost:8080/

## Test

* Lint scripts and run unit tests:

        $ npm test

* Run functional tests:

        $ npm run e2e

    ...or test against local server:

        $ npm start
        $ BASE_URL=http://localhost:8080 npm run e2e

## Deploy

1. Follow Build section.
1. Deploy to Firebase:

        $ npm run deploy
