
const {
    flatten,
    extractRandomItemFromArray
} = require("./../../src/util/array");


describe("Array util flatten", () => {
    it("should flatten a multidimensional array", () => {
        let multidimensionalArray = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        expect(flatten(multidimensionalArray)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
describe("Array util extractRandomItemFromArray", () => {
    it("should extract a number from the array", () => {
        let pool = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        expect(pool.indexOf(extractRandomItemFromArray(pool))).toBeGreaterThan(-1);
    });
    it("should extract a number from the array even if the length is 1", () => {
        let pool = [8];

        expect(pool.indexOf(extractRandomItemFromArray(pool))).toBe(0);
    });
});