'use strict';
//token

const TodoistAPI = require("todoist-js").default;

const todoist = new TodoistAPI(process.env.TODOIST_API_TOKEN);
// Promise.all(projects.split(" ").map((i) => {
//     return todoist.projects.get_data(i).then(data => data.items)
// })).then(data => {
//     let arr = [].concat.apply([], data);
//     console.log(arr[Math.floor(Math.random() * arr.length)]);
// }
//     );

function fetchProjectTasks(project) {
    return todoist.projects.get_data(project)
        .then(getItems);
}
function getItems(data) {
    return data.items;
}
function fetchProjectsTasks(projects) {
    return Promise.all(projects.map(mapProjects));
}

function mapProjects(project) {
    return fetchProjectTasks(project);
}

module.exports = {
    fetchProjectTasks,
    fetchProjectsTasks,
    mapProjects,
    getItems
}