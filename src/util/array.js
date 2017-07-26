'use strict';
function flatten(data) {
    return [].concat.apply([], data)
};

function extractRandomItemFromArray(pool) {
    return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = {
    flatten,
    extractRandomItemFromArray
}