'use strict';
const todoist = require("./src/todoist");
const projects = process.env.TODOIST_PROJECTS.split(" ");

module.exports.planMyDay = (event, context, callback) => {
  todoist.getRandomTaskFromProjects(projects)
    .then(todoist.setTodayAsDeadline)
    .then(todoist.commit)
    .then(() => {
      callback(null, { message: 'success', event });
    })
    .catch(exc => {
      callback(exc);
    })

};
