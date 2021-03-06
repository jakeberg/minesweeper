// Variables
const gameBoard = document.getElementById("gameBoard")
const flagsDiv = document.getElementById("flagNum")
const numberImages = ["assets/tileEmpty.jpg", "assets/numbers/num1.png", "assets/numbers/num2.png", "assets/numbers/num3.png", "assets/numbers/num4.png", "assets/numbers/num5.png", "assets/numbers/num6.png", "assets/numbers/num7.png", "assets/numbers/num8.png", ];
var randomNumberArray = [];
var difficulty = 8;
var sizeOfBoard = difficulty * difficulty;
var bombPositionArray = [];
var flags = 0;
var bombChecked = 0;
var messageDiv = document.getElementById("message");

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
    createBombPositionArray();
    createBoard(d);
    placeNumber();
    messageDiv.style.display = "none";
    messageDiv.innerHTML = "";
}


// Timer function
var myTimer;

function timer(interval, seconds) {
    clearInterval(myTimer);
    let timeDiv = document.getElementById("timer");
    myTimer = setInterval(count, interval);
    let totalSeconds = seconds;

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

    // All data associated with each Tile object
    let tile = document.createElement("div");
    tile.dataset.clickState = "unclicked";
    tile.style.backgroundImage = "url(assets/tile.jpg)"
    tile.style.position = "absolute";
    tile.classList = 'tile';
    tile.style.left = posX + "px";
    tile.style.top = posY + "px";
    tile.dataset.number = tileNumber;
    tile.dataset.row = y;
    tile.dataset.col = x;
    if (randomNumberArray.includes(tileNumber)) {
        tile.classList.add("bomb");
    }
    // Appends all tiles to the board
    board.appendChild(tile);

    // Clicks an open tile and flood fills the rest of the board
    clickOpenTiles = function (event) {
        let selectedTile = event.target;
        let clicked = selectedTile.dataset.clickState;

        if (clicked == "unclicked" && !selectedTile.classList.contains("flagged")) {
            selectedTile.dataset.clickState = "clicked";
            let row = parseInt(selectedTile.dataset.row);
            let col = parseInt(selectedTile.dataset.col);
            let bombsTouchingTile = bombPositionArray[row][col];
            selectedTile.style.backgroundImage = "url(" + numberImages[bombsTouchingTile] + ")";

            if (bombsTouchingTile == 0 && (col - 1) >= 0 && (col - 1) < difficulty && row >= 0 && row < difficulty) {
                document.querySelector(`[data-col="${col - 1}"][data-row="${row}"]`).click();
            }
            if (bombsTouchingTile == 0 && (col + 1) >= 0 && (col + 1) < difficulty && row >= 0 && row < difficulty) {
                document.querySelector(`[data-col="${col + 1}"][data-row="${row}"]`).click();
            }
            if (bombsTouchingTile == 0 && col >= 0 && col < difficulty && (row - 1) >= 0 && (row - 1) < difficulty) {
                document.querySelector(`[data-col="${col}"][data-row="${row - 1}"]`).click();
            }
            if (bombsTouchingTile == 0 && col >= 0 && col < difficulty && (row + 1) >= 0 && (row + 1) < difficulty) {
                document.querySelector(`[data-col="${col}"][data-row="${row + 1}"]`).click();
            }
            if (bombsTouchingTile == 0 && (col - 1) && (col - 1) < difficulty && (row - 1) >= 0 && (row - 1) < difficulty) {
                document.querySelector(`[data-col="${col - 1}"][data-row="${row - 1}"]`).click();
            }
            if (bombsTouchingTile == 0 && (col + 1) >= 0 && (col + 1) < difficulty && (row - 1) >= 0 && (row - 1) < difficulty) {
                document.querySelector(`[data-col="${col + 1}"][data-row="${row - 1}"]`).click();
            }
            if (bombsTouchingTile == 0 && (col + 1) >= 0 && (col + 1) < difficulty && (row + 1) >= 0 && (row + 1) < difficulty) {
                document.querySelector(`[data-col="${col + 1}"][data-row="${row + 1}"]`).click();
            }
            if (bombsTouchingTile == 0 && (col - 1) >= 0 && (col - 1) < difficulty && (row + 1) >= 0 && (row + 1) < difficulty) {
                document.querySelector(`[data-col="${col - 1}"][data-row="${row + 1}"]`).click();
            }
        }
    }

    // Flags the bombs
    flagsDiv.innerText = flags;
    flagBomb = function (event) {
        event.preventDefault();
        let selectedTile = event.target;
        if (selectedTile.classList.contains("flagged")) {
            selectedTile.style.backgroundImage = "url(assets/tile.jpg)";
            flags++
            flagsDiv.innerText = flags;
            selectedTile.classList.remove("flagged");
        } else if (flags > 0) {
            selectedTile.style.backgroundImage = "url(assets/flag.png)";
            flags--;
            flagsDiv.innerText = flags;
            selectedTile.classList.add("flagged");
        }
    }

    // Checks to see how many bombs have been flagged correctly
    countBomb = function (event) {
        event.preventDefault();
        let selectedTile = event.target;
        if (selectedTile.classList.contains("bombChecked")) {
            bombChecked--;
            selectedTile.classList.remove("bombChecked");
        } else if (randomNumberArray.includes(tileNumber)) {
            bombChecked++;
            selectedTile.classList.add("bombChecked");
        }
        // Win Condition
        if (bombChecked == difficulty) {
            messageDiv.innerHTML = "You win!"
            messageDiv.style.display = "block";
        }
    }

    // This checks to see if tile is a bomb and displays a bomb image/ player loses game
    explodeBomb = function (event) {
        let selectedTile = event.target;
        if (randomNumberArray.includes(tileNumber)) {
            selectedTile.style.backgroundImage = "url(assets/bomb.jpg)";
            messageDiv.innerHTML = "You lose! "
            messageDiv.style.display = "block";
            let allBombs = document.querySelectorAll(".bomb");
            for (let bombs in allBombs) {
                allBombs[bombs].style.backgroundImage = "url(assets/bomb.jpg)";
            }
        }
    }

    tile.addEventListener("click", clickOpenTiles);
    tile.addEventListener("click", explodeBomb);
    tile.addEventListener('contextmenu', flagBomb);
    tile.addEventListener('contextmenu', countBomb);
}

// This makes a table where you can keep track of the bomb positions and the tile numbers
function createBombPositionArray() {
    let count = 0;
    for (let i = 0; i < difficulty; i++) {
        let position = [];
        for (let j = 0; j < difficulty; j++) {
            count++;
            if (randomNumberArray.includes(count)) {
                position.push("bomb");
            } else {
                position.push("");
            }
        }
        bombPositionArray.push(position)
    }
}
createBombPositionArray();

// Loops through the bombPositionArray and assigns numbers to any cell touching a bomb
function placeNumber() {
    for (let x = 0; x < bombPositionArray.length; x++) {
        let row = bombPositionArray[x];
        for (let y = 0; y < row.length; y++) {
            let numberOfBombs = 0;
            let tileCheck = {
                left: (bombPositionArray[y] || [])[x - 1],
                right: (bombPositionArray[y] || [])[x + 1],
                above: (bombPositionArray[y - 1] || [])[x],
                below: (bombPositionArray[y + 1] || [])[x],
                upLeft: (bombPositionArray[y - 1] || [])[x - 1],
                upRight: (bombPositionArray[y - 1] || [])[x + 1],
                downLeft: (bombPositionArray[y + 1] || [])[x - 1],
                downRight: (bombPositionArray[y + 1] || [])[x + 1]
            }
            if (bombPositionArray[y][x] !== "bomb") {
                for (let direction in tileCheck) {
                    if (tileCheck[direction] == "bomb") {
                        numberOfBombs++
                    }
                }
                bombPositionArray[y][x] = numberOfBombs;
            }
        }
    }
}
placeNumber();

// Nested loops that make the game board
function createBoard(difficulty) {
    let number = 0;
    for (let i = 0; i < difficulty; i++) {
        for (let j = 0; j < difficulty; j++) {
            let posX = j * 50;
            let posY = i * 50;
            let x = j;
            let y = i;
            number++;
            let tile = new Tile(gameBoard, posX, posY, number, x, y);
        }
    }
}