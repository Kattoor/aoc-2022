const {EOL} = require('os');
const instructions = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(EOL)
    .map((line) => {
        const [direction, amount] = line.split(' ');
        return {direction, amount};
    });

function moveHead(head, direction) {
    const map = {
        'L': {x: -1, y: 0},
        'U': {x: 0, y: 1},
        'R': {x: 1, y: 0},
        'D': {x: 0, y: -1},
    };

    head.x += map[direction].x;
    head.y += map[direction].y;
}

function getDistance(knot1, knot2) {
    return {x: knot1.x - knot2.x, y: knot1.y - knot2.y};
}

function moveKnot(previousKnot, currentKnot) {
    const distance = getDistance(previousKnot, currentKnot);
    const absoluteDistance = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

    if (absoluteDistance < 2) return;
    if (distance.x === 0 && Math.abs(distance.y) > 1) {
        currentKnot.y += (distance.y > 0 ? 1 : -1);
    } else if (distance.y === 0 && Math.abs(distance.x) > 1) {
        currentKnot.x += (distance.x > 0 ? 1 : -1);
    } else {
        currentKnot.x += (distance.x > 0 ? 1 : -1);
        currentKnot.y += (distance.y > 0 ? 1 : -1);
    }
}

function simulateRope(amountOfKnots) {
    const knots = Array.from({length: amountOfKnots}, (_) => ({x: 0, y: 0}));
    const tailPositionLog = [{...knots[knots.length - 1]}];

    instructions.forEach(({direction, amount}) => {
        for (let i = 0; i < amount; i++) {
            moveHead(knots[0], direction);
            for (let i = 1; i < knots.length; i++) {
                moveKnot(knots[i - 1], knots[i], tailPositionLog);
            }
            tailPositionLog.push({...knots[knots.length - 1]});
        }
    });

    return new Set(tailPositionLog.map(({x, y}) => `x${x}y${y}`)).size;
}

/* Part 1 */
console.log(simulateRope(2));

/* Part 2*/
console.log(simulateRope(10));
