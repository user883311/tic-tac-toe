var m = 3; // grid width
var n = 3; // grid length
var k; // number of stones required to win
var grid = initializeGrid(m, n);
// console.log(grid);

var numberHumanPlayers; // 0, 1, 2
var numberComputerPlayers = 2 - numberHumanPlayers; // 0, 1, 2


function promptUserXorO() {
    /*
    This function return a user input in string format: either "x" or "o".
    */
    var userInput;
    while (userInput != "x" && userInput != "o") {
        userInput = window.prompt("Xs or Os? ");
    }
    return userInput;
}

function updateGrid(element, location) {
    /*
    This function updates and returns the grid with a new element placed on it.
    */
}
function initializeGrid(w = 3, l = 3) {
    /*
    This function returns a grid with width w and length l.
    The default grid is 3 by 3. 
    */
    let grid = [];
    for (var i = 0; i < l; i++) {
        grid[i] = [];
        for (var j = 0; j < w; j++) {
            grid[i][j] = undefined;
        }
    }
    return grid;
}
// console.log(initializeGrid(4, 3));

function promptUserNewElementLocation(userNumber, XorO) {
    /*
    This function return a user input in string format: 
    with a row and column number, each between 1 and 3. 
    */
}

function checkGameResult(grid) {
    /*
    This function check a given the grid and returns "x" or "o" if there is 
    a winner, undefined otherwise. 
    The player who succeeds in placing three of their marks in a horizontal,
    vertical, or diagonal row wins the game.
    */

}
function machineNextMove(grid, XorO) {
    /*
    This function picks the best next move for the machine, for a given grid
    and knowing whether X or O is the next move.
    There are 8 winning strategies, according to the combinatorics done by
    Crowley and Spiegler in 1993. 
    */
    /* Strategy 1: if there is a row, column or diagonal with 2 of my pieces
    and a blank space, then play the blank space. */
}

function lookForCombinationsOnGrid(grid, ...args) {
    /* This function looks for a linear sequence of elements (x, o, undefined) 
    on the grid. 
    It returns an array of all beginning and ending coordinates for the 
    corresponding pattern. 
    Inputs:
    - grid, a system of coordinates with an x-axis and an inverted y-axis.   
    - numbers (0s and 1s). 
    */

    let sequence = [];
    sequence.push(args[0]);
    args.reduce(function (accumulator, currentValue, currentIndex, args) {
        return sequence.push(currentValue);
    });
    console.log("sequence =", sequence);

    let testedArr;
    // Look for this combination horizontally. 
    let result1 = [];
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j <= grid[i].length - sequence.length; j++) {
            testedArr = [];
            for (k = 0; k < sequence.length; k++) {
                testedArr.push(grid[i][j + k]);
            }
            if (testedArr.join() === sequence.join()) {
                let start = [j, i];
                let end = [j + sequence.length, i];
                result1.push([start, end]);
            }
        }
    }
    console.log("Found", result1.length, "results horizontally. ");

    // Look for this combination vertically. 
    let result2 = [];
    for (i = 0; i < grid[0].length; i++) {
        for (j = 0; j <= grid.length - sequence.length; j++) {
            testedArr = [];
            for (k = 0; k < sequence.length; k++) {
                testedArr.push(grid[j+k][i]);
            }
            if (testedArr.join() === sequence.join()) {
                let start = [i, j];
                let end = [i, j + sequence.length];
                result2.push([start, end]);
            }
        }
    }
    console.log("Found", result2.length, "results vertically. ");

    // Look for this combination diagonally. 
    let result3 = [];


    return result3;
}
grid = [[1, 4, 1],
[6, 5, 1],
[3, 1, 1]];
console.log(lookForCombinationsOnGrid(grid, 1, 1, ));