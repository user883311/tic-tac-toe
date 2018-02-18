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
    It returns a grid location represented as a [x, y] set of coordinates (a move).

    Optimization: there are 8 winning strategies, according to the combinatorics done by
    Crowley and Spiegler in 1993. 
    */
    let out;
    let OorX = (XorO === "x") ? "o" : "x";

    /* Strategy #1: win. If there is a row, column or diagonal with 2 of my pieces
    and a blank space, then play the blank space. */
    out = applyWinStrategy(grid, XorO);
    if (out === undefined) {
        console.log("--------------------------------- ");
        console.log("Strategy #1 could not be applied. ");
        console.log("--------------------------------- ");
    }
    else {
        console.log("--------------------------------- ");
        console.log("Strategy #1 could be applied. ");
        console.log("--------------------------------- ");
        return out;
    }

    /* Strategy #2: block. If there is a row, column or diagonal with 2 of my 
    opponent's pieces and a blank space, then play the blank space. */
    out = applyWinStrategy(grid, OorX);
    if (out === undefined) {
        console.log("--------------------------------- ");
        console.log("Strategy #2 could not be applied. ");
        console.log("--------------------------------- ");
    }
    else {
        console.log("--------------------------------- ");
        console.log("Strategy #2 could be applied. ");
        console.log("--------------------------------- ");
        return out;
    }

    /* Strategy #3: fork. If there are two intersecting rows, columns, or 
    diagonals with one of my pieces and two blonks, and if the intersecting 
    space is empty, then move to the intersecting space (thus creating two 
    woys to win on my next turn). */
    out = applyForkStrategy(grid, XorO);
    if (out === undefined) {
        console.log("--------------------------------- ");
        console.log("Strategy #3 could not be applied. ");
        console.log("--------------------------------- ");
    }
    else {
        console.log("--------------------------------- ");
        console.log("Strategy #3 could be applied. ");
        console.log("--------------------------------- ");
        return out;
    }

    /* Strategy #4: block fork. If there are two intersecting rows, columns, or diagonals with one of my
        opponent’s pieces ond two blanks, and
        If the intersecting space is empty,
        Then
        (#4a) If there is an empty location that creates a two-in-o-row for me (thus
        forcing my opponent to block rather than fork),
        Then move to the location.*/
        out = applyCreate2inRowStrategy(grid, OorX);
        if (out === undefined) {
            console.log("--------------------------------- ");
            console.log("Strategy #4a could not be applied. ");
            console.log("--------------------------------- ");
        }
        else {
            console.log("--------------------------------- ");
            console.log("Strategy #4a could be applied. ");
            console.log("--------------------------------- ");
            return out;
        }


    /* (#4b)Else move to the Intersection space (thus occupying the location that my
    opponent could use to fork). */
    out = applyForkStrategy(grid, OorX);
    if (out === undefined) {
        console.log("--------------------------------- ");
        console.log("Strategy #4b could not be applied. ");
        console.log("--------------------------------- ");
    }
    else {
        console.log("--------------------------------- ");
        console.log("Strategy #4b could be applied. ");
        console.log("--------------------------------- ");
        return out;
    }

    // return out;
}
grid = [["o", undefined, undefined],
[undefined, "x", undefined],
[undefined, undefined, "o"]];
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

function returnsRandomIntInRange(start, end) {
    let result = Math.random() * (end - start + 1);
    return result.toString()[0];
}
// console.log(returnsRandomIntInRange(0, 5));


function middlePoint(arrCoord1, arrCoord2) {
    /* This function takes 2 pairs of coordinates in the form of arrays. 
    It returns the middle point coordinates (x,y). */
    let result = [];
    let x = (Math.abs(arrCoord1[0] + arrCoord2[0])) / 2;


    let y = (Math.abs(arrCoord1[1] + arrCoord2[1])) / 2;
    return [x, y];
}
// console.log(middlePoint([1, 0], [1, 2])); // [1, 1]
// console.log(middlePoint([0, 2], [2, 0])); // [1, 1]
// console.log(middlePoint([0, 0], [2, 2])); // [1, 1]
// console.log(middlePoint([2, 0], [0, 2])); // [1, 1]


function duplicateValues(arr) {
    var len = arr.length,
        out = [],
        counts = {};

    for (var i = 0; i < len; i++) {
        var item = arr[i];
        counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
        if (counts[item] === 2) {
            out.push(item);
        }
    }
    return out;
}

// var a = [[0, 2],
// [2, 2],
// [1, 2],
// [1, 0],
// [1, 2],
// [1, 1],
// [0, 0],
// [2, 0],
// [1, 0],
// [2, 0],
// [0, 2],
// [1, 1]];
// console.log(duplicateValues(a));


function applyWinStrategy(grid, XorO) {
    let comb1 = lookForCombinationsOnGrid(grid, undefined, XorO, XorO);
    let comb2 = lookForCombinationsOnGrid(grid, XorO, undefined, XorO);
    let comb3 = lookForCombinationsOnGrid(grid, XorO, XorO, undefined);
    let comb = comb1.concat(comb2).concat(comb3);

    if (comb.length > 0) {
        console.log("Strategy #1 (win) applies. There are", comb.length, "options. ");

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
            return middlePoint(a[0], a[1]);
        }
        else if (undefinedPos === 2) {
            return [a[1][0], a[1][1]];
        }
    }
    return undefined;
}

function applyForkStrategy(grid, XorO) {
    let comb1 = lookForCombinationsOnGrid(grid, XorO, undefined, undefined);
    let comb2 = lookForCombinationsOnGrid(grid, undefined, XorO, undefined);
    let comb3 = lookForCombinationsOnGrid(grid, undefined, undefined, XorO);
    let comb = comb1.concat(comb2).concat(comb3);

    if (comb.length > 1) {
        let points = [];
        for (i = 0; i < comb.length; i++) {
            // make a list of all the end/beg point
            points.push(comb[i][0]);
            points.push(comb[i][1]);
            // add all middle points to that list
            points.push(middlePoint(comb[i][0], comb[i][1]));
        }
        // shortlist all the intersections where item is undefined.
        var uniq = duplicateValues(points);
        let blanks = [];
        for (i = 0; i < uniq.length; i++) {
            if (grid[uniq[i][1]][uniq[i][0]] === undefined) {
                blanks.push([uniq[i][1], uniq[i][0]]);
            }
        }
        // pick one intersection at random
        let r = returnsRandomIntInRange(0, blanks.length - 1);
        let a = blanks[r];
        return (a);
    }
    return undefined;
}

function applyCreate2inRowStrategy(grid, XorO) {
    let comb1 = lookForCombinationsOnGrid(grid, XorO, undefined, undefined);
    let comb2 = lookForCombinationsOnGrid(grid, undefined, XorO, undefined);
    let comb3 = lookForCombinationsOnGrid(grid, undefined, undefined, XorO);
    let comb = comb1.concat(comb2).concat(comb3);

    if (comb.length > 0) {
        console.log("Strategy #4a (create-2-in-row) applies. ");

        let points = [];
        for (i = 0; i < comb.length; i++) {
            // make a list of all the end/beg point
            points.push(comb[i][0]);
            points.push(comb[i][1]);
            // add all middle points to that list
            points.push(middlePoint(comb[i][0], comb[i][1]));
        }

        // shortlist all the points where item is undefined.
        let blanks = [];
        for (i = 0; i < points.length; i++) {
            if (grid[points[i][1]][points[i][0]] === undefined) {
                blanks.push([points[i][1], points[i][0]]);
            }
        }
        // Pick one blank cell at random. 
        let r = returnsRandomIntInRange(0, blanks.length - 1);
        let a = blanks[r];
        return (a);
    }
    return undefined;
}
// grid = [["o", undefined, undefined],
//         [undefined, "x", undefined],
//         [undefined, undefined, "o"]];
// console.log(applyCreate2inRowStrategy(grid, "x"));

