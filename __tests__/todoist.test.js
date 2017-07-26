'use strict';
require('dotenv').config({
    path: `${__dirname}/../.env`
});
const planMyDay = require("./../src/todoist");

const projects = process.env.TODOIST_PROJECTS.split(" ");
const project = projects[0];

describe("Plan my day logic", () => {
    it("can retrieve a tasks list from a project", () => {
        planMyDay.fetchProjectTasks(project).then(tasks => {
            expect(tasks.length).toBeDefined();
            expect(tasks.length).toBeGreaterThanOrEqual(0);
        });
    });

    it("can map projects to project", () => {
        planMyDay.mapProjects(project).then(promise => {
            expect(promise).toBeDefined();
            expect(typeof promise).toBe("object");
        });
    });

    it("can extract items from object", () => {
        let items = planMyDay.getItems({ items: "test" });
        expect(items).toBeDefined();
        expect(items).toBe("test");
    });

    it("can retrieve a tasks list from multiple projects", () => {
        planMyDay.fetchProjectsTasks(projects)
            .then(projects => {
                expect(projects.length).toBeDefined();
                expect(projects.length).toBe(projects.length);
            });
    });
});