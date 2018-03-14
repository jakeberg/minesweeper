/* TODO: 
    1. Need a reveal function to check around cell clicked and show all empty tiles.
    2. After the flag placement, if tile is clicked again, add a question mark
    3. Find out if square is touching a bomb and give value to tile
    4. If bomb is clicked, game over and reveal all bombs.
    5. Allow users to add bombs and change size of board
*/


const main = document.querySelector("main");
const tileImages = ["assets/tile.jpg", "assets/tileEmpty.jpg", "assets/bomb.jpg", "assets/flag.png"];

function CreateGameBoard(frame_images, target_div, x, y) {
    this.images = frame_images;
    this.frame = 1;
    this.img = document.createElement("img");
    this.img.src = this.images[0];
    this.img.style.position = "absolute";
    this.img.style.width = "50px";
    this.img.style.height = "50px";
    this.img.style.left = x + "px";
    this.img.style.top = y + "px";

    target_div.appendChild(this.img);

    var clickedImage = this.img;
    var newImage = this.images;
    var newFrameCount = this.frame;
    this.tileSelection = function () {
        if (newFrameCount < 3) {
            clickedImage.src = newImage[newFrameCount];
            newFrameCount++;
        }
    }

    this.flagBomb = function (event) {
        event.preventDefault();
        clickedImage.src = newImage[3];
    }

    this.img.addEventListener("click", this.tileSelection);
    this.img.addEventListener('contextmenu', this.flagBomb);
}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        var x = i * 50;
        var y = j * 50;
        var board = new CreateGameBoard(tileImages, main, x, y);
    }
}


