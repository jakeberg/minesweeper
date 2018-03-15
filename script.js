/* TODO: 
    1. Need a reveal function to check around cell clicked and show all empty tiles.
    2. After the flag placement, if tile is clicked again, add a question mark
    3. Find out if square is touching a bomb and give value to tile
    4. If bomb is clicked, game over and reveal all bombs.
    5. Allow users to add bombs and change size of board
*/

// Variables
const gameBoard = document.getElementById("gameBoard")
const tileImages = ["assets/tile.jpg", "assets/tileEmpty.jpg", "assets/bomb.jpg", "assets/flag.png"];
let randomNumberArray = [];
var difficulty = 8;
var bombs = 8;

// Buttons
const easy = document.getElementById("easy").addEventListener("click", function () {reset(8, 8);});
const medium = document.getElementById("medium").addEventListener("click", function () {reset(10, 10);});
const hard = document.getElementById("hard").addEventListener("click", function () {reset(15, 15);});
const resetButton = document.getElementById("reset").addEventListener("click", function () {reset();});

function reset(d, b) {
    randomNumberArray = [];
    gameBoard.innerHTML = "";
    difficulty = d;
    bombs = b;
    randomizeNumbers();
    createBoard();
    createDataSets();
    randomizeNumbers();
}

var sizeOfBoard = difficulty * difficulty;
// Creates an array of ten random number to place bombs on board
function randomizeNumbers() {
    for (let i = 0; i <= bombs; i++) {
        let randomNumber = Math.floor(Math.random() * Math.floor(sizeOfBoard));
        randomNumberArray.push(randomNumber);
    };
}
randomizeNumbers();

//Object constructor of a tile and it's click attributes
function Tile(tileImages, board, x, y, num) {

    this.img = document.createElement("img");
    this.img.src = tileImages[0];
    this.img.value = parseInt(num);
    this.img.style.position = "absolute";
    this.img.style.width = "50px";
    this.img.style.height = "50px";
    this.img.style.left = x + "px";
    this.img.style.top = y + "px";
    board.appendChild(this.img);

    var clickedImage = this.img;
    var newImage = this.images;
    var newFrameCount = this.frame;
    var tileNumber = parseInt(num);

    checkTile = function () {
        console.log(tileNumber);
        if (randomNumberArray.includes(tileNumber)) {
            clickedImage.src = tileImages[2];
            document.getElementById("message").style.display = "block";
        } else {
            clickedImage.src = tileImages[1];
        }
    }

    flagBomb = function (event) {
        event.preventDefault();
        clickedImage.src = newImage[3];
    }

    this.img.addEventListener("click", checkTile);
    this.img.addEventListener('contextmenu', flagBomb);
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
}
createBoard();

// This makes a table where you can keep track of the bomb positions and the tile numbers
function createDataSets() {
    var bombPositionArray = [];
    var coordinatesArray = [];
    var count = 0;
    for (let i = 0; i < difficulty; i++) {
        let position = [];
        let coordinates = [];
        for (let j = 0; j < difficulty; j++) {
            count++;
            coordinates.push(count);
            if (randomNumberArray.includes(count)) {
                position.push(count);
            } else {
                position.push(null);
            }
        }
        bombPositionArray.push(position)
        coordinatesArray.push(coordinates)
    }
    console.table(bombPositionArray)
    console.table(coordinatesArray)
}
createDataSets();