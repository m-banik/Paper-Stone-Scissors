const images = Array(...document.images);
const btn = document.querySelector(".start");
const panelLeft = document.querySelectorAll(".left-panel span");
const panelRight = document.querySelectorAll(".right-panel span");
const results = [0, 0, 0, 0];
const options = images.map(image => image.dataset.option);
let playerChoice = "";
let AIChoice = "";
images.forEach(image => {
  image.style.cursor = "pointer";
  image.addEventListener("click", () => {
    images.forEach(innerImage => {
      innerImage.style.boxShadow = "";
    });
    playerChoice = image.dataset.option;
    image.style.boxShadow = "0 0 .5em .5em rebeccapurple";
  });
});
const result = () => {
  let flag = false;
  if (playerChoice == AIChoice) {
    flag = null;
    results[results.length - 1]++;
  } else if (playerChoice == options[0]) {
    if (AIChoice == options[1]) {
      results[1]++;
      flag = true;
    } else if (AIChoice == options[2]) results[2]++;
  } else if (playerChoice == options[1]) {
    if (AIChoice == options[0]) {
      results[2]++;
    } else if (AIChoice == options[2]) {
      results[1]++;
      flag = true;
    }
  } else {
    if (AIChoice == options[0]) {
      results[1]++;
      flag = true;
    } else if (AIChoice == options[1]) results[2]++;
  }
  panelLeft.forEach((span, index) => {
    switch (index) {
      case 0:
        span.textContent = playerChoice;
        break;
      case 1:
        span.textContent = AIChoice;
        break;
      default:
        switch (flag) {
          case true:
            span.style.color = "cadetblue";
            span.textContent = "you!".toUpperCase();
            break;
          case null:
            span.style.color = "#777";
            span.textContent = "tie";
            break;
          default:
            span.style.color = "rgba(255,0,0,1)";
            span.textContent = "computer :(";
            break;
        }
        break;
    }
  });
  panelRight.forEach((span, index) => {
    switch (index) {
      case 0:
        span.textContent = ++results[0];
        break;
      case 1:
        span.textContent = results[1];
        break;
      case 2:
        span.textContent = results[2];
        break;
      default:
        span.textContent = results[3];
        break;
    }
  });
};
btn.addEventListener("click", () => {
  if (!playerChoice) {
    alert("Choose something!");
    return;
  }
  const random = Math.floor(Math.random() * 3);
  AIChoice = options[random];
  result();
});
