const {EOL} = require('os');
const lines = require('fs').readFileSync('./input.txt', 'utf-8').split(EOL);

const calories =
    lines
        .reduce((groups, line) => {
            if (line === '' || groups.length === 0) {
                groups[groups.length] = 0;
            } else {
                groups[groups.length - 1] += parseInt(line);
            }
            return groups;
        }, []);

const sortedCalories = calories.sort((a, b) => b - a);

/* Part 1 */
console.log(sortedCalories[0]);

/* Part 2 */
console.log(
    sortedCalories
        .slice(0, 3)
        .reduce((sum, curr) => sum + curr));
