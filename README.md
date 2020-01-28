# Interview Scheduler

Interview Scheduler is a simple, single page app that allows users to book interviews in appointment slots. I worked on this project during week 7 and 8 of the Lighthouse Labs bootcamp. We were given CSS and some starter code for this project so we could focus on learning React, Storybook, and using two different testing libraries: Jest and Cypress. 

I have also hosted a version with the database on Heroku (https://swz-scheduler.herokuapp.com/api/*) and the client app on Netlify (https://swz-scheduler.netlify.com/). 

## Setup

Install dependencies with `npm install`.
Run the scheduler-api.

## Running Webpack Development Server

```sh
npm start
```
The app will run on localhost:8000. 

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

# Final Product

### Initial view - small screens
!["Initial view - small screens"](https://github.com/susan-wz/Scheduler/blob/master/docs/initial-small-screen.png?raw=true)

### Initial view - large screens
!["Initial view - large screens"](https://github.com/susan-wz/Scheduler/blob/master/docs/initial-large-screen.png?raw=true)

### View when hovering on an interview
!["View when hovering on an interview"](https://github.com/susan-wz/Scheduler/blob/master/docs/interview-hover.png?raw=true)

### Form for creating and editing interviews
!["Form for creating and editing interviews"](https://github.com/susan-wz/Scheduler/blob/master/docs/create-and-edit-form.png?raw=true)

### Confirmation on delete
!["Confirmation on delete"](https://github.com/susan-wz/Scheduler/blob/master/docs/delete-confirmation.png?raw=true)

## Dependencies
 - Axios
 - React, React-dom, react-scripts
 - Classnames
 - Normalize.css
 - Eslint

## Dev dependencies
 - Babel
 - Storybook (with addons actions, backgrounds, links)
 - Testing library/jest-dom, react, react-hooks
 - Prop-types
 - React test renderer