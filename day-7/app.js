const { EOL } = require('os');
const lines = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(EOL);

let inLsCommand = false;

const tree = [];
let currentDirectory = null;
lines.forEach((line) => {
    if (line.startsWith('$')) {
        inLsCommand = false;
        parseCommand(line);
    } else {
        if (inLsCommand) {
            parseOutput(line);
        }
    }
});

function getDirectoryInCurrentDirectory(directoryName) {
    return currentDirectory
        .children
        .filter((child) => child.type === 'directory')
        .find((directory) => directory.name === directoryName);
}

function parseCommand(line) {
    if (line.startsWith('$ cd')) {
        const directoryName = line.replace('$ cd ', '');
        
        if (directoryName === '..') {
            currentDirectory = currentDirectory.parent;
        } else {
            const newDirectory = {
                type: 'directory',
                name: directoryName,
                children: [],
                parent: null,
            };

            if (currentDirectory === null) {
                tree.push(newDirectory);
                currentDirectory = newDirectory;
            } else {
                const directoryInCurrentDirectory = getDirectoryInCurrentDirectory(directoryName);
                if (directoryInCurrentDirectory === undefined) {
                    currentDirectory.children.push(newDirectory);
                } else {
                    currentDirectory = directoryInCurrentDirectory;
                }
            }   
        }
    } else if (line.startsWith('$ ls')) {
        inLsCommand = true;
    }
}

function parseOutput(line) {
    const [first, second] = line.split(' ');
    if (first === 'dir') {
        currentDirectory.children.push({
            type: 'directory',
            name: second,
            children: [],
            parent: currentDirectory,
        });
    } else {
        currentDirectory.children.push({
            type: 'file',
            name: second,
            size: parseInt(first),
        });
    }
}

function getDirectorySize(directory) {
    const directorySize = directory.children.reduce((acc, curr) => {
        if (curr.type === 'directory') {
            return acc + getDirectorySize(curr);
        } else if (curr.type === 'file') {
            return acc + curr.size;
        }
    }, 0);
    directory.totalSize = directorySize;
    return directorySize;
}

getDirectorySize(tree[0]);

function getDirectoriesWithAtMost100K(directory, list) {
    if (directory.totalSize <= 100000) {
        list.push(directory);
    }
    directory
        .children
        .filter((child) => child.type === 'directory')
        .forEach((childDirectory) => getDirectoriesWithAtMost100K(childDirectory, list));
    return list;
}

function flattenDirectories(directory, list) {
    list.push(directory);
    directory
        .children
        .filter((child) => child.type === 'directory')
        .forEach((childDirectory) => flattenDirectories(childDirectory, list));
    return list;
}

/* Part 1 */
const directoriesWithAtMost100K = getDirectoriesWithAtMost100K(tree[0], []);
const sum = directoriesWithAtMost100K.reduce((sum, curr) => sum + curr.totalSize, 0)
console.log(sum);

/* Part 2 */
const neededSize = 30000000;
const totalSize = 70000000;
const availableSize = totalSize - tree[0].totalSize;
const sizeToFree = neededSize - availableSize;
const flatDirectories = flattenDirectories(tree[0], []);
const directoryToDelete = flatDirectories
    .filter((directory) => directory.totalSize >= sizeToFree)
    .sort((a, b) => a.totalSize - b.totalSize)[0];
console.log(directoryToDelete.totalSize);
