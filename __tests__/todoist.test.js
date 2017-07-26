'use strict';
require('dotenv').config({
    path: `./../.env`
});
const planMyDay = require("./../src/todoist");
const projects = process.env.TODOIST_PROJECTS.split(" ");
const project = projects[0];


describe("Plan my day logic", () => {
    it("can retrieve a tasks list from a project", () => {
        planMyDay.fetchProjectTasks(projects).then(tasks => {
            expect(tasks.length).toBeDefined();
            expect(tasks.length).toBeGreaterThanOrEqual(0);
        });
    });

});