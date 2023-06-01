const cells = document.querySelectorAll(".cell");
const userScore = document.querySelector("#yourNum");
const compScore = document.querySelector("#computerNum");
const restart = document.querySelector("#restart");
const statusText = document.querySelector("#statusText")
const xScoreText = document.querySelector("#xScore")
const oScoreText = document.querySelector("#oScore")
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let xScore = 0
let oScore = 0

let running = false;

initialiseGame();

function initialiseGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restart.addEventListener("click", restartGame)
    statusText.innerHTML = (currentPlayer+"'s turn")
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")
    if (options[cellIndex] != "" || !running){
        return;
    }
    else {
    updateCell(this, cellIndex);
    checkWinner();
    }
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    if (currentPlayer === "X"){
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    statusText.innerHTML = (currentPlayer+"'s turn")
}
function incScore(){
    if (currentPlayer === "X"){
        xScore++;
        xScoreText.innerHTML=xScore
    }
    else if (currentPlayer === "O"){
        oScore++;
        oScoreText.innerHTML=oScore;
    }
    console.log(oScore);
    console.log(xScore);
}
function checkWinner(){
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === ""){
            continue;
        }
        if (cellA === cellB && cellB === cellC){
            roundWon = true;
            break;
        }}
    if (roundWon === true){ 
        statusText.innerHTML = currentPlayer + ' wins';
        incScore()
        running = false;
    } else if (!options.includes("")){
        statusText.innerHTML = ("Draw");
    } else {
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = (currentPlayer + "'s turn");
    cells.forEach(cell => cell.innerHTML = "");
    running = true;
}