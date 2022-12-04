const {EOL} = require('os');
const input = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(EOL)
    .map((line) => line.split(','))
    .map(([sectionsElf1, sectionsElf2]) =>
        [
            sectionsElf1.split('-').map(Number),
            sectionsElf2.split('-').map(Number),
        ]);

const totalOverlapsFilter =
    (p1, p2, q1, q2) => (p1 >= q1 && p2 <= q2) || (q1 >= p1 && q2 <= p2);

const partialOverlapsFilter =
    (p1, p2, q1, q2) => (p1 >= q1 && p1 <= q2) || (p2 >= q1 && p2 <= q2);

/* Part 1 */
const pairsWithTotalOverlap =
    input.filter(([p, q]) => totalOverlapsFilter(...p, ...q));
console.log(pairsWithTotalOverlap.length);

/* Part 2 */
const pairsWithPartialOverlap =
    input.filter(([p, q]) =>
        totalOverlapsFilter(...p, ...q) || partialOverlapsFilter(...p, ...q));
console.log(pairsWithPartialOverlap.length);
