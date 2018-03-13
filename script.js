const main = document.querySelector("main");

var flipCounter = [0, 0];

var board = {
    
    state: 0,
    flip: function () {
        // randomly set this.state to be either 0 or 1
        this.state = Math.round(Math.random() * 3);
    },
    toString: function () {
        // return “H” or “T” depending on whether this.state is 0 or 1
        if (this.state == 0) {
            return "B"
        };
        if (this.state == 1 || this.state == 2 || this.state == 3) {
            return "O"
        };
    },
    toHTML: function () {
        // set the properties of the image element to show either heads or tails
        var img = document.createElement("img");
        if (this.toString() == "B") {
            img.classList = ("bomb");
            flipCounter[this.state] += 1;
        } else if (this.toString() == "O") {
            img.classList = ("tile");
            flipCounter[this.state] += 1;
        }
        main.appendChild(img);
        return img;
    }
};

for (i = 0; i <= 8; i++) {
    for (j = 0; j <= 8; j++) {
        board.flip();
        board.toString();
        board.toHTML();
    }
}

let newDiv = document.createElement("div");
var newText = document.createTextNode("Bombs: " + flipCounter[0] + " / Open spaces: " + flipCounter[1]);
newDiv.appendChild(newText);
main.appendChild(newDiv);