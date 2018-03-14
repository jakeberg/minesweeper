const main = document.querySelector("main");
const tileImages = ["assets/tile.jpg", "assets/tileEmpty.jpg", "assets/bomb.jpg"];

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


    //
    var clickedImage = this.img;
    var newImage = this.images;
    var newFrameCount = this.frame;
    
    this.tileSelection = function () {
        if (newFrameCount < 2) {
            clickedImage.src = newImage[newFrameCount];
            newFrameCount++;
        }
    }

    this.img.addEventListener("click", this.tileSelection);


}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        var x = i * 50;
        var y = j * 50;
        var board = new CreateGameBoard(tileImages, main, x, y);
    }
}

