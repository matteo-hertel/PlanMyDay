'use strict';

const TodoistAPI = require("todoist-js").default;
const { flatten, extractRandomItemFromArray } = require("./util/array");
const todoist = new TodoistAPI(process.env.TODOIST_API_TOKEN);


/**
 * Public
 */

/**
 * Gets all the project's tasks and extract a random one
 * 
 * @param {any} projects 
 * @returns Promise
 */
function getRandomTaskFromProjects(projects) {
    return _fetchProjectsTasks(projects)
        .then(_getRandomTask);
}

/**
 * Update a task's deadline to Today
 * 
 * @param {object} task 
 * @returns object
 */
function setTodayAsDeadline(task) {
    todoist.items.update(task.id, { date_string: 'Today' });
    return task;
}

/**
 * Private
 */

/**
 * Fetch in parallel all the projects' tasks
 * 
 * @param {any} projects 
 * @returns Promise
 */
function _fetchProjectsTasks(projects) {
    return Promise.all(projects.map(_mapProjects))
}
/**
 * function to be passed as to map, returns a promise to fetch the project's tasks
 * 
 * @param {any} project 
 * @returns Promise
 */
function _mapProjects(project) {
    return _getTasksFromProjectId(project);
}
/**
 * Get all the tasks for a given project
 * 
 * @param {string|int} project 
 * @returns Promise
 */
function _getTasksFromProjectId(project) {
    return todoist.projects.get_data(project)
        .then(_getItems);
}
/**
 * extract the item property of an object
 * 
 * @param {object} data 
 * @returns array
 */
function _getItems(data) {
    if (!data.items) {
        throw new Error("The given object is missing the items property");
    };

    return data.items
}

/**
 * get a multi dimensional array of tasks, flatten it and return a random one
 * 
 * @param {array} tasks 
 * @returns object
 */
function _getRandomTask(tasks) {
    return extractRandomItemFromArray(flatten(tasks));
}
/**
 * function to commit the transactions to ToDoist
 * 
 * @returns 
 */
function commit() {
    todoist.commit();
    return true;
}
module.exports = {
    getRandomTaskFromProjects,
    setTodayAsDeadline,
    commit,
    //Export private function in order to test them
    private: {
        _getTasksFromProjectId,
        _fetchProjectsTasks,
        _mapProjects,
        _getItems,
        _getRandomTask,
        todoist
    }
}