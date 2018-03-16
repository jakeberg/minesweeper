// Variables
const gameBoard = document.getElementById("gameBoard")
const tileImages = ["assets/tile.jpg", "assets/bomb.jpg", "assets/flag.png"];
const numberImages = ["assets/tileEmpty.jpg", "assets/numbers/num1.png", "assets/numbers/num2.png", "assets/numbers/num3.png", "assets/numbers/num4.png", "assets/numbers/num5.png", "assets/numbers/num6.png", "assets/numbers/num7.png", "assets/numbers/num8.png", ];
let randomNumberArray = [];
var difficulty = 8;
var bombs = 8;
var sizeOfBoard = difficulty * difficulty;
var bombPositionArray = [];
var coordinatesArray = [];

// // // Buttons
// const easy = document.getElementById("easy").addEventListener("click", function () {
//     reset(8, 8);
// });
// const medium = document.getElementById("medium").addEventListener("click", function () {
//     reset(10, 10);
// });
// const hard = document.getElementById("hard").addEventListener("click", function () {
//     reset(15, 15);
// });
// const resetButton = document.getElementById("reset").addEventListener("click", function () {
//     reset();
// });

// // Reset Function
// function reset(d, b) {
//     randomNumberArray = [];
//     gameBoard.innerHTML = "";
//     difficulty = d;
//     bombs = b;
//     randomizeNumbers();
//     createBoard();
// }

// Creates an array of ten random number to place bombs on board
function randomizeNumbers() {
    while (randomNumberArray.length < 10) {
        let randomNumber;
        randomNumber = Math.floor(Math.random() * Math.floor(sizeOfBoard));
        if (!randomNumberArray.includes(randomNumber)) {
            randomNumberArray.push(randomNumber);
        }
    }
}
randomizeNumbers();
console.log(randomNumberArray)

//Object constructor of a tile and it's click attributes
function Tile(tileImages, board, x, y, tileNumber) {

    var img = document.createElement("img");
    img.src = tileImages[0];
    img.style.position = "absolute";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.left = x + "px";
    img.style.top = y + "px";
    board.appendChild(img);

    checkTilesAroundBomb = function () {
        var tempX;
        var tempY;

        for (let i = 0; i < coordinatesArray.length; i++) {
            var coordRow = coordinatesArray[i];
            for (let j = 0; j < coordRow.length; j++) {
                coordCell = coordRow[j]
                if (tileNumber == coordCell) {
                    tempX = j;
                    tempY = i;
                }
            }
        }
        var checker = {
            left: () => (bombPositionArray[tempY] || [])[tempX - 1],
            right: () => (bombPositionArray[tempY] || [])[tempX + 1],
            top: () => (bombPositionArray[tempY - 1] || [])[tempX],
            down: () => (bombPositionArray[tempY + 1] || [])[tempX],
            topRight: () => (bombPositionArray[tempY - 1] || [])[tempX + 1],
            topLeft: () => (bombPositionArray[tempY - 1] || [])[tempX - 1],
            downRight: () => (bombPositionArray[tempY + 1] || [])[tempX + 1],
            downLeft: () => (bombPositionArray[tempY + 1] || [])[tempX - 1],
        }
        let numberOfBombs = 0;

        if (tempX < difficulty && tempX >= 0 && tempY < difficulty && tempY >= 0) {
            var isLBomb = (checker.left() == "bomb") ? numberOfBombs++ : "";
            var isRBomb = (checker.right() == "bomb") ? numberOfBombs++ : "";
            var isTBomb = (checker.top() == "bomb") ? numberOfBombs++ : "";
            var isDBomb = (checker.down() == "bomb") ? numberOfBombs++ : "";
            var isTlBomb = (checker.topRight() == "bomb") ? numberOfBombs++ : "";
            var isTRBomb = (checker.topLeft() == "bomb") ? numberOfBombs++ : "";
            var isDlBomb = (checker.downLeft() == "bomb") ? numberOfBombs++ : "";
            var isDRBomb = (checker.downRight() == "bomb") ? numberOfBombs++ : "";
            img.src = numberImages[numberOfBombs];
        }

        if (randomNumberArray.includes(tileNumber)) {
            img.src = tileImages[1];
            document.getElementById("message").style.display = "block";
        }
    }

    flagBomb = function (event) {
        event.preventDefault();
        img.src = tileImages[2];
    }

    img.addEventListener("click", checkTilesAroundBomb);
    img.addEventListener('contextmenu', flagBomb);
}


// This makes a table where you can keep track of the bomb positions and the tile numbers
var count = 0;
for (let i = 0; i < difficulty; i++) {
    let position = [];
    let coordinates = [];
    for (let j = 0; j < difficulty; j++) {
        count++;
        coordinates.push(count);
        if (randomNumberArray.includes(count)) {
            position.push("bomb");
        } else {
            position.push(null);
        }
    }
    bombPositionArray.push(position)
    coordinatesArray.push(coordinates)
}

// Nested loops that make the game board
function createBoard() {
    let number = 0;
    for (let i = 0; i < difficulty; i++) {
        for (let j = 0; j < difficulty; j++) {
            var x = j * 50;
            var y = i * 50;
            number++;
            var tile = new Tile(tileImages, gameBoard, x, y, number);
        }
    }
    console.table(bombPositionArray)
console.log(coordinatesArray)
}
createBoard();
