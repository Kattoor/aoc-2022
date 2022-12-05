const {EOL} = require('os');
const [blocksInput, instructionsInput] = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .trimEnd()
    .split(EOL + EOL)
    .map((part) => part.split(EOL));

function getStacks() {
    const longestLineLength = blocksInput[blocksInput.length - 1].length;
    const amountOfTowers = (longestLineLength + 1) / 4;
    return blocksInput.slice(0, -1).reduce((acc, line) => {
        for (let i = 0; i < amountOfTowers; i++) {
            const startIndex = i * 3 + i;
            const crate = line.slice(startIndex, startIndex + 3)[1];
            if (crate !== ' ') {
                acc[i].unshift(crate);
            }
        }
        return acc;
    }, [...Array(amountOfTowers)].map((_) => []));
}

function getInstructions() {
    return instructionsInput.map((line) => {
        const [_, amount, from, to] =
            /move (\d+) from (\d+) to (\d+)/g.exec(line);
        return {amount, from, to};
    });
}

const stacks = getStacks();
const instructions = getInstructions();
const printSolution = (stacks) =>
    console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));

/* Part 1 */
const part1StacksCopy = JSON.parse(JSON.stringify(stacks));
instructions.forEach(({amount, from, to}) => {
    for (let i = 0; i < amount; i++) {
        const crate = part1StacksCopy[from - 1].pop();
        part1StacksCopy[to - 1].push(crate);
    }
});
printSolution(part1StacksCopy);

/* Part 2 */
const part2StacksCopy = JSON.parse(JSON.stringify(stacks));
instructions.forEach(({amount, from, to}) => {
    const cratesInHolding = [];
    for (let i = 0; i < amount; i++) {
        const crate = part2StacksCopy[from - 1].pop();
        cratesInHolding.push(crate);
    }
    part2StacksCopy[to - 1].push(...cratesInHolding.reverse());
});
printSolution(part2StacksCopy);
