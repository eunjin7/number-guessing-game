//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!!
//랜덤번호가 > 유저번호 UP!!
//Rest버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다(더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resetButton = document.querySelector(".button-reset");
let resultText = document.querySelector(".result-text");
let chances = 5; //남은기회
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let userValueList = []; // userValueList 배열 추가, 유저가 입력한 숫자들

chanceArea.innerHTML = `남은기회:${chances}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
//유저가 값을 재입력할때 Backspace누르지 않고 알아서 입력창 초기화해주기
userInput.addEventListener("focus", focusInput);


function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  //숫자 추측하기 랜덤숫자뽑기
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1과 100사이 숫자를 입력해 주세요.";
    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
    return;
  }

  chances--;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  userValueList.push(userValue);

  if (userValue < computerNum) {
    resultAreaImg.src =
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHlwY3VxZ242bTg4ZjV1d2JqMGdoZjlvYWliNnZ2MjF1Y2FxMGZhcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d5Hgiq0neyKqWO62cj/giphy.gif";
    resultText.textContent = "Up!";
  } else if (userValue > computerNum) {
    resultAreaImg.src =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazR2bGluNGUxOHgyZm96ZmdjbTQ4YjE3bzF0cngydDRsNGxveWd4aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aiQ9WDXoDK4mN8Xgji/giphy.gif";
    resultText.textContent = "Down!";
  } else {
    resultAreaImg.src =
    "https://media.tenor.com/images/0a81b89954678ebe228e15e35044f7a5/tenor.gif";
    resultText.textContent = "정답!";
    gameOver = true;
  }

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function focusInput() {
    userInput.value = "";
  }

function reset() {
  //리셋
  pickRandomNum();
  //user input 창이 깨끗하고
  userInput.value = "";
  resultAreaImg.src =
    "https://i1.ruliweb.com/ori/18/11/09/166f5d794501e3903.gif";
  resultText.textContent = "맞춰야 살아남는다";
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  userValueList = [];
}

pickRandomNum();
