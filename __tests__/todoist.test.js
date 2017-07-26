'use strict';
require('dotenv').config({
    path: `${__dirname}/../.env`
});
const api = require("./../src/todoist");

const projects = process.env.TODOIST_PROJECTS.split(" ");
const project = projects[0];

describe("Plan my day logic", () => {
    it("should retrieve a tasks list from a project", () => {
        api.fetchProjectTasks(project).then(tasks => {
            expect(tasks.length).toBeDefined();
            expect(tasks.length).toBeGreaterThanOrEqual(0);
        });
    });

    it("should map projects to project", () => {
        api.mapProjects(project).then(promise => {
            expect(promise).toBeDefined();
            expect(typeof promise).toBe("object");
        });
    });

    it("should extract items from object", () => {
        let items = api.getItems({ items: "test" });
        expect(items).toBeDefined();
        expect(items).toBe("test");
    });

    it("should throw if the property items is missing", () => {
        expect(() => {
            api.getItems({})
        }).toThrow();
    });

    it("should retrieve a tasks list from multiple projects", () => {
        api.fetchProjectsTasks(projects)
            .then(projects => {
                expect(projects.length).toBeDefined();
                expect(projects.length).toBe(projects.length);
            });
    });
});