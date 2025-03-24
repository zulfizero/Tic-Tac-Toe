let boxes = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#reset-button");
let msgContainer = document.querySelector(".msg-container");
let newGameButton = document.querySelector("#new-button");
let msg = document.querySelector("#msg");
let turnO = true; // playerX, PlayerO
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableCells();
    msgContainer.classList.add("hide");
}

boxes.forEach((cell) => {
    cell.addEventListener("click", () => {
        console.log("clicked ok");
        cell.innerText = "ok";
        if(turnO) {
            cell.innerText = "O";
            turnO = false;
        }
        else {
            cell.innerText = "X";
            turnO = true;
        }
        cell.disabled = true;
        count++;

        let isWinner = checkWinPatterns();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableCells = () => {
    for (let cells of boxes){
        cells.disabled = true;
    }
};

const enableCells = () => {
    for (let cells of boxes){
        cells.disabled = false;
        cells.innerText = ""; 
    }
};

const showWinner = (Winner) => {
    msg.innerText = `Congratulation  Winner is ${Winner} `;
    msgContainer.classList.remove("hide");
    disableCells();
};

const checkWinPatterns = () => {
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};

newGameButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
