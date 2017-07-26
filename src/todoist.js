'use strict';
//token

const TodoistAPI = require("todoist-js").default;
const { flatten, extractRandomItemFromArray } = require("./util/array");
const todoist = new TodoistAPI(process.env.TODOIST_API_TOKEN);
// Promise.all(projects.split(" ").map((i) => {
//     return todoist.projects.get_data(i).then(data => data.items)
// })).then(data => {
//     let arr = [].concat.apply([], data);
//     console.log();
// }
//     );

function fetchProjectTasks(project) {
    return todoist.projects.get_data(project)
        .then(getItems);
}
function getItems(data) {
    if (!data.items) {
        throw new Error("The given object is missing the items property");
    };

    return data.items
}
function fetchProjectsTasks(projects) {
    return Promise.all(projects.map(mapProjects));
}

function mapProjects(project) {
    return fetchProjectTasks(project);
}

function getRandomTaskFromProjects(projects) {
    return fetchProjectsTasks(projects).then(tasks => {
        return extractRandomItemFromArray(flatten(tasks));
    })
}

module.exports = {
    getRandomTaskFromProjects,
    private: {
        fetchProjectTasks,
        fetchProjectsTasks,
        mapProjects,
        getItems
    }
}