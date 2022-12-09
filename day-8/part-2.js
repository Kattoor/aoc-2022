const {EOL} = require('os');
const lines = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(EOL)
    .map((line) => line.split(''));

const map = lines.map((row) => row.map(Number));

const highestTreeScore = getHighestTreeScoreInMap(map);
console.log(highestTreeScore);

function getHighestTreeScoreInMap(map) {
    return map.reduce((highestTreeScoreInMap, row, y) =>
        Math.max(highestTreeScoreInMap, getHighestTreeScoreInRow(row, y)), 0);
}

function getHighestTreeScoreInRow(row, y) {
    return row.reduce((highestTreeScoreInRow, cell, x) =>
        Math.max(highestTreeScoreInRow, getTreeScore(map, x, y)), 0);
}

function getTreeScore(map, x, y) {
    return getTreeScoreUp(map, x, y)
        * getTreeScoreRight(map, x, y)
        * getTreeScoreDown(map, x, y)
        * getTreeScoreLeft(map, x, y);
}

function getTreeScoreUp(map, x, y) {
    let score = 0;
    if (y === 0) return score;
    for (let i = y - 1; i >= 0; i--) {
        score += 1;
        if (map[i][x] >= map[y][x]) return score;
    }
    return score;
}

function getTreeScoreRight(map, x, y) {
    let score = 0;
    if (x === map[y].length - 1) return score;
    for (let i = x + 1; i < map[y].length; i++) {
        score += 1;
        if (map[y][i] >= map[y][x]) return score;
    }
    return score;
}

function getTreeScoreDown(map, x, y) {
    let score = 0;
    if (y === map.length - 1) return score;
    for (let i = y + 1; i < map.length; i++) {
        score += 1;
        if (map[i][x] >= map[y][x]) return score;
    }
    return score;
}

function getTreeScoreLeft(map, x, y) {
    let score = 0;
    if (x === 0) return score;
    for (let i = x - 1; i >= 0; i--) {
        score += 1;
        if (map[y][i] >= map[y][x]) return score;
    }
    return score;
}
