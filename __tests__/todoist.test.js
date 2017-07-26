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
    it("should retrieve one random task form all the given projects", () => {
        api.getRandomTaskFromProjects(projects)
            .then(task => {
                expect(task).toBeDefined();
                expect(task.content).toBeDefined();
            });
    });
    /**
     * Private API
     */
    it("should retrieve a tasks list from a project", () => {
        api.private._getTasksFromProjectId(project)
            .then(tasks => {
                expect(tasks.length).toBeDefined();
                expect(tasks.length).toBeGreaterThanOrEqual(0);
            });
    });

    it("should map projects to project", () => {
        api.private._mapProjects(project)
            .then(promise => {
                expect(promise).toBeDefined();
                expect(typeof promise).toBe("object");
            });
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

    it("should retrieve a tasks list from multiple projects", () => {
        api.private._fetchProjectsTasks(projects)
            .then(projects => {
                expect(projects.length).toBeDefined();
                expect(projects.length).toBe(projects.length);
            });
    });
});