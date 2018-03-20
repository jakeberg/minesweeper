// Variables
const gameBoard = document.getElementById("gameBoard")
const flagsDiv = document.getElementById("flagNum")
const numberImages = ["assets/tileEmpty.jpg", "assets/numbers/num1.png", "assets/numbers/num2.png", "assets/numbers/num3.png", "assets/numbers/num4.png", "assets/numbers/num5.png", "assets/numbers/num6.png", "assets/numbers/num7.png", "assets/numbers/num8.png", ];
var randomNumberArray = [];
var difficulty = 8;
var sizeOfBoard = difficulty * difficulty;
var bombPositionArray = [];
var flags;


// Buttons
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const resetButton = document.getElementById("reset");


easy.addEventListener("click", function () {
    resetGame(8);
});
medium.addEventListener("click", function () {
    resetGame(10);
});
hard.addEventListener("click", function () {
    resetGame(15);
});
resetButton.addEventListener("click", function () {
    resetGame(difficulty);
});


// Reset Function
function resetGame(d) {
    gameBoard.innerHTML = "";
    randomNumberArray = [];
    bombPositionArray = [];
    sizeOfBoard = d * d;
    difficulty = d;
    flags = d;
    document.getElementById("message").style.display = "none";
    randomizeNumbers(d);
    timer(1000, 0);
    // data();
    createBoard(d);
}


// Timer function
var myTimer;

function timer(interval, seconds) {
    clearInterval(myTimer);
    var timeDiv = document.getElementById("timer");
    myTimer = setInterval(count, interval);
    var totalSeconds = seconds;

    function count() {
        totalSeconds++;
        timeDiv.innerHTML = ":" + totalSeconds;
    }
}


// Creates an array of ten random number to place bombs on board
function randomizeNumbers(d) {
    while (randomNumberArray.length < d) {
        let randomNumber;
        randomNumber = Math.floor(Math.random() * Math.floor(sizeOfBoard));
        if (!randomNumberArray.includes(randomNumber)) {
            randomNumberArray.push(randomNumber);
        }
    }
}
randomizeNumbers(difficulty);


//Object constructor of a tile and it's click attributes
function Tile(board, posX, posY, tileNumber, x, y) {
    var tile = document.createElement("div");
    tile.style.backgroundImage = "url(assets/tile.jpg)"
    tile.style.position = "absolute";
    tile.classList = 'tile t' + tileNumber;
    tile.style.left = posX + "px";
    tile.style.top = posY + "px";
    tile.dataset.row = x;
    tile.dataset.col = y;
    if (randomNumberArray.includes(tileNumber)) {
        tile.dataset.bombNum = "bomb"
    }

    board.appendChild(tile);



    checkTilesAroundBomb = function (event) {

        let clickedTile = event.target;
        let row = clickedTile.dataset.row;
        let col = clickedTile.dataset.col

        // var queue = [];
        // queue.push(x, y)

        // while (queue.length > 0) {
            // newY = queue.shift();
            // newX = queue.shift();

            // Checks the positions in the bomb array
            let checker = [
                {y, (x -1)},
                {y, (x + 1)},
                {(y-1), x}
                [(bombPositionArray[newY - 1] || [])[newX]],
                [(bombPositionArray[newY + 1] || [])[newX]],
                [(bombPositionArray[newY - 1] || [])[newX + 1]],
                [(bombPositionArray[newY - 1] || [])[newX - 1]],
                [(bombPositionArray[newY + 1] || [])[newX + 1]],
                [(bombPositionArray[newY + 1] || [])[newX - 1]],
            ]

            // Marks how many bombs clicked tile is touching
            let numberOfBombs = 0;
            let tileNear;
            let tileNearRow;
            let tileNearCol;
            // for (var direction in checker) {
            //     if(!checker[direction]) return;

            //     if (checker[direction] == "bomb") {
            //         numberOfBombs++;
            //         tile.style.backgroundImage = "url(" + numberImages[numberOfBombs] + ")";
            //     } else if (checker[direction] != "bomb") {
            //         let cellNumber = checker[direction];
            //         tileNear = board.querySelector(".t" + cellNumber);
            //         tileNearRow = parseInt(tileNear.dataset.row);
            //         tileNearCol = parseInt(tileNear.dataset.col);
            //         queue.push(tileNearRow, tileNearCol)
            //         tileNear.style.backgroundImage = "url(" + numberImages[numberOfBombs] + ")";
            //     }
            //     console.log(tileNearRow, tileNearCol)
            
            // }
        // }
        console.log(clickedTileRow)
    }

    // This checks to see if tile is a bomb and displays a bomb image
    explodeBomb = function () {
        if (randomNumberArray.includes(tileNumber)) {
            tile.style.backgroundImage = "url(assets/bomb.jpg)";
            document.getElementById("message").style.display = "block";
        }
    }

    // This flags the bombs
    flagsDiv.innerText = flags;
    let flagBomb = function (event) {
        event.preventDefault();
        if (flags > 0) {
            tile.style.backgroundImage = "url(assets/flag.png)";
            flags--;
            flagsDiv.innerText = flags;
        }
    }

    tile.addEventListener("click", checkTilesAroundBomb);
    tile.addEventListener("click", explodeBomb);
    tile.addEventListener('contextmenu', flagBomb);
}

// // This makes a table where you can keep track of the bomb positions and the tile numbers
// function data() {
//     var count = 0;
//     for (let i = 0; i < difficulty; i++) {
//         let position = [];
//         for (let j = 0; j < difficulty; j++) {
//             count++;
//             if (randomNumberArray.includes(count)) {
//                 position.push("bomb");
//             } else {
//                 position.push(count);
//             }
//         }
//         bombPositionArray.push(position)
//     }
// }
// data();

// Nested loops that make the game board
function createBoard(difficulty) {
    let number = 0;
    for (let i = 0; i < difficulty; i++) {
        for (let j = 0; j < difficulty; j++) {
            var posX = j * 50;
            var posY = i * 50;
            var x = j;
            var y = i;
            number++;
            var tile = new Tile(gameBoard, posX, posY, number, x, y);
        }
    }
    console.log(randomNumberArray)
}


// use foreach for array of objects

// get cell by query selector 