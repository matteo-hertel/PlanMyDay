'use strict';
require('dotenv').config({
    path: `${__dirname}/../.env`
});
const api = require("./../src/todoist");

const projects = process.env.TODOIST_PROJECTS.split(" ");
const project = projects[0];

describe("Plan my day logic", () => {
    /**
     * Public API
     */
    it("should retrieve one random task form all the given projects", async () => {
        try {
            let task = await api.getRandomTaskFromProjects(projects);
            expect(task).toBeDefined();
            expect(task.content).toBeDefined();
        } catch (exc) {
            expect(exc).not.toBeDefined();
        };
    });
    it("should set the date of a task as today", async () => {
        try {
            let task = await createFakeTask();
            await api.setTodayAsDeadline(task);
            await deleteFakeTask(task);
            let commit = await api.commit();
            expect(commit).toBe(true);
        } catch (exc) {
            expect(exc).not.toBeDefined();
        };
    });

    /**
     * Private API
     */
    it("should retrieve a tasks list from a project", async () => {
        try {
            let tasks = await api.private._getTasksFromProjectId(project)
            expect(tasks.length).toBeDefined();
            expect(tasks.length).toBeGreaterThanOrEqual(0);
        } catch (exc) {
            expect(exc).not.toBeDefined();
        };
    });

    it("should map projects to project", async () => {
        try {
            let promise = await api.private._mapProjects(project)
            expect(promise).toBeDefined();
            expect(typeof promise).toBe("object");
        } catch (exc) {
            expect(exc).not.toBeDefined();
        };
    });

    it("should extract items from object", () => {
        let items = api.private._getItems({ items: "test" });
        expect(items).toBeDefined();
        expect(items).toBe("test");
    });
    it("should extract a random item from a multidimensional array", () => {
        let items = [
            [],
            [1],
            []
        ];
        expect(api.private._getRandomTask(items)).toBe(1);
    });

    it("should throw if the property items is missing", () => {
        expect(() => {
            api.private._getItems({})
        }).toThrow();
    });

    it("should retrieve a tasks list from multiple projects", async () => {
        try {
            let projectsTasks = await api.private._fetchProjectsTasks(projects)
            expect(projectsTasks.length).toBeDefined();
            expect(projectsTasks.length).toBe(projects.length);
        } catch (exc) {
            expect(exc).not.toBeDefined();
        };
    });
});

function createFakeTask() {
    return api.private.todoist.sync()
        .then(() => {
            let inbox = api.private.todoist.state.projects.find(project => project.name === 'Inbox');
            let item = api.private.todoist.items.add('TestTask', inbox.id);
            return item;
        });
}
function deleteFakeTask(task) {
    task.delete();
    return task;
}
