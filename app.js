let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; //player X, Player O
let count = 0;
const winPattren = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.enable = true;
  box.addEventListener("click", () => {
    if (turnO) {
      //Player O
      box.innerText = "O";
      turnO = false;
    } else {
      //Player X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `It's a draw`;
  msgContainer.classList.remove("hide");
  dissableBoxes();
};
const dissableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `${winner} is the winner`;
  msgContainer.classList.remove("hide");
  dissableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPattren) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;
    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        console.log("winner " + posVal1);
        showWinner(posVal1);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
