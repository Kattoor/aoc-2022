const {EOL} = require('os');
const input = require('fs')
    .readFileSync('./input.txt', 'utf-8')
    .split(EOL)
    .filter((line) => line !== '')
    .map((line) => line.split(' '));

const Moves = {
    Rock: 0,
    Paper: 1,
    Scissors: 2,
};

const RoundResult = {
    Lose: 0,
    Draw: 1,
    Win: 2,
};

const inputToOpponentMovesConverter = {
    'A': Moves.Rock,
    'B': Moves.Paper,
    'C': Moves.Scissors,
};

const resultToPointsConverter = {
    [RoundResult.Lose]: 0,
    [RoundResult.Draw]: 3,
    [RoundResult.Win]: 6,
};

const moveToPointsConverter = {
    [Moves.Rock]: 1,
    [Moves.Paper]: 2,
    [Moves.Scissors]: 3,
};

const calculatePoints = ({result, playerMove}) => resultToPointsConverter[result] + moveToPointsConverter[playerMove];

const sum = (acc, curr) => acc + curr;

/* Part 1 */
(() => {
    const inputToPlayerMovesConverter = {
        'X': Moves.Rock,
        'Y': Moves.Paper,
        'Z': Moves.Scissors,
    };

    const charsToGameMoves = ([opponentMove, playerMove]) => [inputToOpponentMovesConverter[opponentMove], inputToPlayerMovesConverter[playerMove]];

    const getRoundResult = ([opponentMove, playerMove]) => {
        if (playerMove === opponentMove) {
            return {result: RoundResult.Draw, playerMove};
        }

        const playerWinConditions = {
            [Moves.Rock]: (opponentMove) => opponentMove === Moves.Scissors,
            [Moves.Paper]: (opponentMove) => opponentMove === Moves.Rock,
            [Moves.Scissors]: (opponentMove) => opponentMove === Moves.Paper,
        };

        return {
            result: playerWinConditions[playerMove](opponentMove) ? RoundResult.Win : RoundResult.Lose,
            playerMove
        };
    }

    const points = input
        .map(charsToGameMoves)
        .map(getRoundResult)
        .map(calculatePoints)
        .reduce(sum);

    console.log(points);
})();

/* Part 2 */
(() => {
    const inputToRoundEndConverter = {
        'X': RoundResult.Lose,
        'Y': RoundResult.Draw,
        'Z': RoundResult.Win,
    };

    const roundEndToPlayerMoveConverter = {
        [RoundResult.Lose]: {
            [Moves.Rock]: Moves.Scissors,
            [Moves.Scissors]: Moves.Paper,
            [Moves.Paper]: Moves.Rock,
        },
        [RoundResult.Draw]: {
            [Moves.Rock]: Moves.Rock,
            [Moves.Scissors]: Moves.Scissors,
            [Moves.Paper]: Moves.Paper,
        },
        [RoundResult.Win]: {
            [Moves.Rock]: Moves.Paper,
            [Moves.Scissors]: Moves.Rock,
            [Moves.Paper]: Moves.Scissors,
        },
    };

    const charsToGameMoves = ([opponentMoveInput, roundEndInput]) => {
        const opponentMove = inputToOpponentMovesConverter[opponentMoveInput];
        const roundEnd = inputToRoundEndConverter[roundEndInput]
        const playerMove = roundEndToPlayerMoveConverter[roundEnd][opponentMove];
        return {result: roundEnd, playerMove};
    }

    const points = input
        .map(charsToGameMoves)
        .map(calculatePoints)
        .reduce(sum);

    console.log(points);
})();
