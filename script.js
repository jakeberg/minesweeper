/* TODO: 
    1. Need a reveal function to check around cell clicked and show all empty tiles.
    2. After the flag placement, if tile is clicked again, add a question mark
    3. Find out if square is touching a bomb and give value to tile
    4. If bomb is clicked, game over and reveal all bombs.
    5. Allow users to add bombs and change size of board
*/
var difficulty = 8;
var bombs = 8;
const easy = document.getElementById("easy").addEventListener("click", function () {
    difficulty = 8;
    bombs = 8;
    createBoard();
});
const medium = document.getElementById("medium").addEventListener("click", function () {
    difficulty = 10;
    bombs = 10;
    createBoard();
});
const hard = document.getElementById("hard").addEventListener("click", function () {
    difficulty = 15;
    bombs = 15;
    createBoard();
});


const main = document.getElementById("gameBoard")
const tileImages = ["assets/tile.jpg", "assets/tileEmpty.jpg", "assets/bomb.jpg", "assets/flag.png"];
// const tilesArray = [];
let bombArray = [];

// Creates an array of ten random number to place bombs on board
for (let i = 0; i <= bombs; i++) {
    let randomNumber = Math.floor(Math.random() * Math.floor(difficulty * difficulty));
    bombArray.push(randomNumber)
};

//Object constructor of a tile and it's click attributes
function Tile(frame_images, target_div, x, y, num) {
    this.img = document.createElement("img");
    this.img.src = frame_images[0];
    this.img.style.position = "absolute";
    this.img.style.width = "50px";
    this.img.style.height = "50px";
    this.img.style.left = x + "px";
    this.img.style.top = y + "px";
    // tilesArray.push(num);
    target_div.appendChild(this.img);

    var tileNumber = parseInt(num);
    var clickedImage = this.img;
    var newImage = this.images;
    var newFrameCount = this.frame;


    checkTile = function () {
        console.log(tileNumber)
        if (bombArray.includes(tileNumber)) {
            clickedImage.src = frame_images[2];
        } else {
            clickedImage.src = frame_images[1];
        }

    }
    flagBomb = function (event) {
        event.preventDefault();
        clickedImage.src = newImage[3];
    }

    this.img.addEventListener("click", checkTile);
    this.img.addEventListener('contextmenu', flagBomb);
}
console.log(bombArray)

// Nested loops that make the game board
function createBoard() {
    for (let i = 0; i < difficulty; i++) {
        for (let j = 0; j < difficulty; j++) {
            var x = i * 50;
            var y = j * 50;
            var number = String(i) + String(j);
            var tile = new Tile(tileImages, main, x, y, number);
        }
    }
}
createBoard();

console.log(main)