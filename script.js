/* Scoreboard elements */
const points = document.getElementById("points");
const guessed = document.getElementById("guessed");
const missed = document.getElementById("missed");

/* RGB spans */
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

/* The boxes from the game board */
const boxes = Array.from(document.getElementsByClassName("game-board-box"));

var solution = 0;

$("#newGame").on("click", () => {
    /* Reseting the scoreboard */
    points.innerHTML = "0";
    guessed.innerHTML = "0";
    missed.innerHTML = "0";

    GenerateColors();
});

boxes.forEach((element, index) => {
    element.addEventListener("click", () => {
        if(index+1 == solution) { // Guessed right
            guessed.innerHTML = parseInt(guessed.innerHTML) + 1;
            points.innerHTML = parseInt(points.innerHTML) + 10;
            GenerateColors();
        }
        else { //Guessed wrong
            missed.innerHTML = parseInt(missed.innerHTML) + 1;
            points.innerHTML = parseInt(points.innerHTML) - 5;

            //Remove the box
            $(element).css("backgroundColor", "transparent"); 
            $(element).css("boxShadow","none")
        }
    });
});

function GenerateColors() {
    /* Generating a random number to pick the color to be guessed */
    solution = Math.round(Math.random() * 6);
    while(!solution)
        solution = Math.round(Math.random() * 6);

    for(var i = 0; i < 6; ++i)
    {
        //Remake all the boxes
        $(boxes[i]).css("display", "block"); 
        $(boxes[i]).css("boxShadow", "4px 4px 10px rgba(0,0,0,.2)");

        //Generate color
        const redT = Math.round(Math.random() * 255);
        const greenT = Math.round(Math.random() * 255);
        const blueT = Math.round(Math.random() * 255);

        //Update the color of box number i
        $(boxes[i]).css("backgroundColor","rgb(" + redT + "," + greenT + "," + blueT + ")");

        //update the rgb code from the header
        if(i+1 == solution) {
            red.innerHTML = redT;
            green.innerHTML = greenT;
            blue.innerHTML = blueT;
        }
    }
}
