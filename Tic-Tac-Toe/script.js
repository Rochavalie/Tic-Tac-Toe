currentTurn = 0;
runGame = true;
congratulationsRan = false;
winFound = false;

function getBoardStatus() {
  board = [];
  for (let i = 0; i < 9; i++) {
    column = "column-" + String(i + 1);
    board[i] = document.getElementById(column).innerHTML;
  }
  return board;
}

function returnXO() {
  if (currentTurn % 2 == 0) return "O";
  return "X";
}

function playAlertAnimation(){
  var element = document.getElementById("child-alert-container");
  
  element.classList.add("alert-animation");
  element.addEventListener("animationend", function () {
    element.classList.remove("alert-animation");
  });
}

function openAlert() {
  board = getBoardStatus();
  boardFull = true;
  var element = document.getElementById("parent-alert-container");
  var congratulations = document.getElementById("alert-title");

  for (let i = 0; i < 9; i++)
    if (board[i] == "") {
      boardFull = false;
    }

  if (boardFull == true && winFound == false) {
    congratulations.innerHTML = "UNFORTUNATELY THE GAME IS A TIE";
    congratulations.style.backgroundColor = "#FFA500";
    element.style.display = "flex";
    return playAlertAnimation();
  }

  if (congratulationsRan == false) {
    congratulations.innerHTML =
      "CONGRATULATIONS " + returnXO() + ", YOU ARE THE WINNER!";
      congratulationsRan = true;
      element.style.display = "flex";
    return playAlertAnimation();
  }

  congratulations.innerHTML = returnXO() + " HAD ALREADY WON!";
  congratulations.style.backgroundColor = "#C31248";
  element.style.display = "flex";
  playAlertAnimation()
}

function alertWinner() {
  runGame = false;
  winFound = true;
  return openAlert();
}

function closeAlert() {
  var element = document.getElementById("parent-alert-container");
  element.style.display = "none";
  congratulations.style.backgroundColor = "#03C04A";
}

function winCondition() {
  board = getBoardStatus();
  if (board[0] == board[1] && board[1] == board[2] && board[0] != "")
    return alertWinner();
  else if (board[3] == board[4] && board[4] == board[5] && board[3] != "")
    return alertWinner();
  else if (board[6] == board[7] && board[7] == board[8] && board[6] != "")
    return alertWinner();
  else if (board[0] == board[3] && board[3] == board[6] && board[0] != "")
    return alertWinner();
  else if (board[1] == board[4] && board[4] == board[7] && board[1] != "")
    return alertWinner();
  else if (board[2] == board[5] && board[5] == board[8] && board[2] != "")
    return alertWinner();
  else if (board[0] == board[4] && board[4] == board[8] && board[0] != "")
    return alertWinner();
  else if (board[2] == board[4] && board[4] == board[6] && board[2] != "")
    return alertWinner();
}

function changeBoard(element) {
  if (element.innerHTML === "" && runGame == true) {
    element.innerHTML = returnXO();
    element.classList.toggle("text-size-change");
    winCondition();
    if(runGame == true){
        currentTurn += 1;
        if (currentTurn == 9) alertWinner();
    }
  } else if (element.innerHTML != "" && runGame == true) {
    element.classList.add("enlarge-rotate");
    element.addEventListener("animationend", function () {
      element.classList.remove("enlarge-rotate");
    });
  } else if (runGame == false) openAlert();
}
