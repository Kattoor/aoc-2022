const {EOL} = require('os');
const lines = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(EOL)
    .map((line) => line.split(''));

const map = lines.map((row) => row.map(Number));

const amountOfVisibleTrees =
    map.reduce((mapSum, row, y) => mapSum +
            row.reduce((rowSum, cell, x) =>
                    isVisible(map, x, y)
                        ? rowSum + 1
                        : rowSum,
                0),
        0);

console.log(amountOfVisibleTrees);

function isVisible(map, x, y) {
    return isVisibleFromTop(map, x, y)
        || isVisibleFromRight(map, x, y)
        || isVisibleFromBottom(map, x, y)
        || isVisibleFromLeft(map, x, y);
}

function isVisibleFromTop(map, x, y) {
    if (y === 0) return true;
    for (let i = y - 1; i >= 0; i--) {
        if (map[i][x] >= map[y][x]) return false;
    }
    return true;
}

function isVisibleFromRight(map, x, y) {
    if (x === map[y].length - 1) return true;
    for (let i = x + 1; i < map[y].length; i++) {
        if (map[y][i] >= map[y][x]) return false;
    }
    return true;
}

function isVisibleFromBottom(map, x, y) {
    if (y === map.length - 1) return true;
    for (let i = y + 1; i < map.length; i++) {
        if (map[i][x] >= map[y][x]) return false;
    }
    return true;
}

function isVisibleFromLeft(map, x, y) {
    if (x === 0) return true;
    for (let i = x - 1; i >= 0; i--) {
        if (map[y][i] >= map[y][x]) return false;
    }
    return true;
}
