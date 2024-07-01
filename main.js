let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultImage = document.getElementById("result-image");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let answerArea = document.getElementById("answer-area");
let chances = 3;
let gameOver = false;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNumb() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
  answerArea.textContent = `정답: ${computerNum}`;
}

function play() {
  let userValue = userInput.value;

  if (userValue === "") {
    resultImage.src = "why.jpg";
    resultArea.textContent = "입력된 숫자가 없습니다";
    return;
  } else if (userValue < 1 || userValue > 100) {
    resultImage.src = "why.jpg";
    resultArea.textContent = "1과 100사이 숫자를 입력해주세요";
    return;
  }

  if (history.includes(userValue)) {
    resultImage.src = "error.gif";
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
    return;
  }

  chances--;
  chanceArea.textContent = `남은 찬스: ${chances}번`;
  if (userValue < computerNum) {
    resultImage.src = "upndown.gif";
    resultArea.textContent = "UP!!!";
  } else if (userValue > computerNum) {
    resultImage.src = "upndown.gif";
    resultArea.textContent = "DOWN!!!";
  } else {
    resultImage.src = "complete.gif";
    resultArea.textContent = "맞췄습니다!!!";
    gameOver = true;
  }

  history.push(userValue);

  if (chances < 1) {
    resultImage.src = "fail.jpg";
    resultArea.textContent = "실패";
    gameOver = true;
  }

  if (gameOver) {
    userInput.disabled = true;
    playButton.disabled = true;
  }
}

function reset() {
  userInput.value = "";
  pickRandomNumb();

  resultImage.src = "bonobono.jpg";
  resultArea.textContent = "대기 중";
  playButton.disabled = false;
  chances = 3;
  gameOver = false;
  chanceArea.textContent = `남은 기회: ${chances}번`;
  history = [];
  userInput.disabled = false;
}

pickRandomNumb();
