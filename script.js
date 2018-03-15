/* TODO: 
    1. Need a reveal function to check around cell clicked and show all empty tiles.
    2. After the flag placement, if tile is clicked again, add a question mark
    3. Find out if square is touching a bomb and give value to tile
    4. If bomb is clicked, game over and reveal all bombs.
    5. Allow users to add bombs and change size of board
*/


const main = document.querySelector("main");
const tileImages = ["assets/tile.jpg", "assets/tileEmpty.jpg", "assets/bomb.jpg", "assets/flag.png"];
const tilesArray = [];
const bombArray = [];


// Creates an array of ten random number to place bombs on board
for (let i = 0; i <= 10; i++) {
    let randomNumber = Math.floor(Math.random() * Math.floor(100));
    bombArray.push(randomNumber)
};

console.log(bombArray)

//Object constructor of a tile and it's click attributes
function Tile(frame_images, target_div, x, y, num) {
    this.images = frame_images;
    // this.frame = 1;
    this.img = document.createElement("img");
    this.img.src = this.images[0];
    this.img.style.position = "absolute";
    this.img.style.width = "50px";
    this.img.style.height = "50px";
    this.img.style.left = x + "px";
    this.img.style.top = y + "px";
    var tileNumber = parseInt(num);
    tilesArray.push(num)

    target_div.appendChild(this.img);

    var clickedImage = this.img;
    var newImage = this.images;
    var newFrameCount = this.frame;

    this.flagBomb = function (event) {
        event.preventDefault();
        clickedImage.src = newImage[3];
    }

    this.checkBomb = function () {
        for (let i = 0; i < bombArray.length; i++) {
            if (tileNumber == bombArray[i]) {
                clickedImage.src = newImage[2];
                alert("You Lose!")
            } else {
                clickedImage.src = newImage[1];
            }
        }
    }
    this.img.addEventListener('contextmenu', this.flagBomb);
    this.img.addEventListener("click", this.checkBomb);
}


// Nested loops that make the game board
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        var x = i * 50;
        var y = j * 50;
        var number = String(i) + String(j);
        var tile = new Tile(tileImages, main, x, y, number);
    }
}

console.log(main);