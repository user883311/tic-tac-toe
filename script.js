var m = 3; // grid width
var n = 3; // grid length
var k; // number of stones required to win
var grid = initializeGrid(m, n);

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
    It returns a grid location represented as a (x, y) coordinate.

    Optimization: there are 8 winning strategies, according to the combinatorics done by
    Crowley and Spiegler in 1993. 
    */
    let result = [];

    /* Strategy #1: win. If there is a row, column or diagonal with 2 of my pieces
    and a blank space, then play the blank space. */
    let comb1 = lookForCombinationsOnGrid(grid, undefined, XorO, XorO);
    let comb2 = lookForCombinationsOnGrid(grid, XorO, undefined, XorO);
    let comb3 = lookForCombinationsOnGrid(grid, XorO, XorO, undefined);
    let comb = comb1.concat(comb2).concat(comb3);

    if (comb.length > 0) {
        console.log("Strategy #1 applies. There are", comb.length, "options. ");

        let r = returnsRandomIntInRange(0, comb.length - 1);
        let a = comb[r]; // pattern chosen

        let undefinedPos;
        if (r < comb1.length) { undefinedPos = 0 }
        else if (r < comb1.concat(comb2).length) { undefinedPos = 1 }
        else { undefinedPos = 2 }

        if (undefinedPos === 0) {
            return [a[0][0], a[0][1]];
        }
        else if (undefinedPos === 1) {
            let x = (Math.abs(a[0][0] - a[1][0])) / 2;
            let y = (Math.abs(a[0][1] - a[1][1])) / 2;
            // return a;
            return [x, y];
        }
        else if (undefinedPos === 2) {
            return [a[1][0], a[1][1]];
        }
    }
    return "Strategy #1 could not be applied. ";

    /* Strategy #2: block. If there is a row, column or diagonal with 2 of my opponent's 
    pieces and a blank space, then play the blank space. */
    


    return result;
}
grid = [[undefined, undefined, "o"],
        ["o", "o", undefined],
        ["x", "x", undefined]];
console.log(machineNextMove(grid, "x"));

function lookForCombinationsOnGrid(grid, ...args) {
    /* This function looks for a linear sequence of elements (x, o, undefined) 
    on the grid. 
    It returns an array of all beginning and ending coordinates (x, y) for 
    the corresponding pattern. 
    Inputs:
    - grid, a system of coordinates with an x-axis and an inverted y-axis.   
    - elements can be any sort of built-in objects.  
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
                let end = [j + sequence.length - 1, i];
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
                testedArr.push(grid[j + k][i]);
            }
            if (testedArr.join() === sequence.join()) {
                let start = [i, j];
                let end = [i, j + sequence.length - 1];
                result2.push([start, end]);
            }
        }
    }
    console.log("Found", result2.length, "results vertically. ");

    // Look for this combination diagonally. 
    let result3 = [];
    for (i = 0; i <= grid.length - sequence.length; i++) {
        for (j = 0; j <= grid[i].length - sequence.length; j++) {
            testedArr = [];
            for (k = 0; k < sequence.length; k++) {
                testedArr.push(grid[i + k][j + k]);
            }
            if (testedArr.join() === sequence.join()) {
                let start = [j, i];
                let end = [j + sequence.length - 1, i + sequence.length - 1];
                result3.push([start, end]);
            }
        }
    }
    console.log("Found", result3.length, "results diagonally (left to right). ");

    // and diagonally the other way... 
    let result4 = [];
    for (i = 0; i <= grid.length - sequence.length; i++) { // line i = 0
        for (j = grid[i].length - 1; j >= 0 + sequence.length - 1; j--) { // column j = 1
            testedArr = [];
            for (k = 0; k < sequence.length; k++) {
                testedArr.push(grid[i + k][j - k]); // + 1 line to i, -1 col to j
            }
            if (testedArr.join() === sequence.join()) {
                let start = [j, i];
                let end = [j - sequence.length + 1, i + sequence.length - 1];
                result4.push([start, end]);
            }
        }
    }
    console.log("Found", result4.length, "results diagonally (right to left). ");

    let result = result1.concat(result2);
    result = result.concat(result3);
    result = result.concat(result4);

    return result;
}
// grid = [[1, 1, 3],
//         [1, 1, 1],
//         [1, 1, 1],
//         [0, 1, 1]];
// console.log(lookForCombinationsOnGrid(grid, 1, 1, 1, 0));

function combinationsCoordinatesOnGrid(grid, ...args) {
    /* This function looks for a linear sequence of elements (x, o, undefined) 
    on the grid. 
    It returns an array of the pairs of each elements paired with their resp. 
    beginning and ending coordinates (x, y). 

    Inputs:
    - grid, a system of coordinates with an x-axis and an inverted y-axis.   
    - elements can be any sort of built-in objects.  

    Returns: an array where each item is [element, [x, y]].
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
                let end = [j + sequence.length - 1, i];
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
                testedArr.push(grid[j + k][i]);
            }
            if (testedArr.join() === sequence.join()) {
                let start = [i, j];
                let end = [i, j + sequence.length - 1];
                result2.push([start, end]);
            }
        }
    }
    console.log("Found", result2.length, "results vertically. ");

    // Look for this combination diagonally. 
    let result3 = [];
    for (i = 0; i <= grid.length - sequence.length; i++) {
        for (j = 0; j <= grid[i].length - sequence.length; j++) {
            testedArr = [];
            for (k = 0; k < sequence.length; k++) {
                testedArr.push(grid[i + k][j + k]);
            }
            if (testedArr.join() === sequence.join()) {
                let start = [j, i];
                let end = [j + sequence.length - 1, i + sequence.length - 1];
                result3.push([start, end]);
            }
        }
    }
    console.log("Found", result3.length, "results diagonally (left to right). ");

    // and diagonally the other way... 
    let result4 = [];
    for (i = 0; i <= grid.length - sequence.length; i++) { // line i = 0
        for (j = grid[i].length - 1; j >= 0 + sequence.length - 1; j--) { // column j = 1
            testedArr = [];
            for (k = 0; k < sequence.length; k++) {
                testedArr.push(grid[i + k][j - k]); // + 1 line to i, -1 col to j
            }
            if (testedArr.join() === sequence.join()) {
                let start = [j, i];
                let end = [j - sequence.length + 1, i + sequence.length - 1];
                result4.push([start, end]);
            }
        }
    }
    console.log("Found", result4.length, "results diagonally (right to left). ");

    let result = result1.concat(result2);
    result = result.concat(result3);
    result = result.concat(result4);

    return result;
}
// grid = [[1, 1, 3],
//         [1, 1, 1],
//         [1, 1, 1],
//         [0, 1, 1]];
// console.log(lookForCombinationsOnGrid(grid, 1, 1, 1, 0));

function returnsRandomIntInRange(start, end) {
    let result = Math.random() * (end - start + 1);
    return result.toString()[0];
}
// console.log(returnsRandomIntInRange(0, 5));

function pickRandomArrElement(arr) {
    if (arr.length === 0) { return undefined };

    let r = Math.random() * (arr.length);
    return arr[r.toString()[0]];
}
// console.log(pickRandomArrElement(["a", "v", "c", "d"]));