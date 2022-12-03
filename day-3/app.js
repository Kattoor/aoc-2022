const {EOL} = require('os');
const input = require('fs').readFileSync('./input.txt', 'utf-8');

const charToPriority = (char) => char.charCodeAt(0) - (char === char.toUpperCase() ? 38 : 96);
const sum = (acc, curr) => acc + curr;

/* Part 1 */
(() => {
    const prioritySum = input
        .split(EOL)
        .filter((line) => line !== '')
        .map((line) =>
            [
                line.slice(0, line.length / 2).split(''),
                line.slice(line.length / 2).split('')
            ])
        .map(([part1, part2]) => part1.find((char) => part2.includes(char)))
        .map(charToPriority)
        .reduce(sum);

    console.log(prioritySum);
})();

/* Part 2 */
(() => {
    const arrayIntersection = (first, second) => first.filter((char) => second.includes(char));

    const groups =
        [...input.matchAll(/(\S+\s{1,2}){3}/g)]
            .map((groups) => groups[0].trim().split(EOL)
                .map((rucksack) => rucksack.split('')));

    const prioritySum =
        groups
            .map((group) => group.reduce(arrayIntersection)[0])
            .map(charToPriority)
            .reduce(sum);

    console.log(prioritySum);
})();
