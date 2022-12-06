const line = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('');

const areAllUniqueChars = (chars) => chars.length === new Set(chars).size;

const findXConsecutiveUniqueChars = (line, amountOfConsecutiveCharsToFind) => {
    const queue = line.splice(0, amountOfConsecutiveCharsToFind);
    let counter = amountOfConsecutiveCharsToFind;
    while (!areAllUniqueChars(queue)) {
        queue.shift();
        queue.push(line.shift());
        counter += 1;
    }
    return counter;
};

/* Part 1 */
console.log(findXConsecutiveUniqueChars([...line], 4));

/* Part 2 */
console.log(findXConsecutiveUniqueChars([...line], 14));
