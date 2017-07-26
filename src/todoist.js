'use strict';

const TodoistAPI = require("todoist-js").default;
const { flatten, extractRandomItemFromArray } = require("./util/array");
const todoist = new TodoistAPI(process.env.TODOIST_API_TOKEN);

function _getTasksFromProjectId(project) {
    return todoist.projects.get_data(project)
        .then(_getItems);
}
function _getItems(data) {
    if (!data.items) {
        throw new Error("The given object is missing the items property");
    };

    return data.items
}
function _fetchProjectsTasks(projects) {
    return Promise.all(projects.map(_mapProjects))
}

function _mapProjects(project) {
    return _getTasksFromProjectId(project);
}

function getRandomTaskFromProjects(projects) {
    return _fetchProjectsTasks(projects)
        .then(_getRandomTask);
}
function _getRandomTask(tasks) {
    return extractRandomItemFromArray(flatten(tasks));
}
module.exports = {
    getRandomTaskFromProjects,
    private: {
        _getTasksFromProjectId,
        _fetchProjectsTasks,
        _mapProjects,
        _getItems,
        _getRandomTask
    }
}