import "./style.scss";

const maxScore = 35;
let score;

const resultDiv = document.querySelector(".result-score");
if (resultDiv) {
  score = +localStorage.getItem("points");
  resultDiv.innerHTML = score;
}

const againBtn = document.querySelector(".again-bth");
if (againBtn) {
  if (score != maxScore) againBtn.classList.remove("hide");
  else {
    againBtn.classList.add("hide");
  }
  againBtn.addEventListener("click", () => {
    location.href = "./quiz.html";
  });
}

const congratsDiv = document.querySelector(".congrats");
if (congratsDiv) {
  if (score == maxScore) congratsDiv.classList.remove("hide");
  else {
    congratsDiv.classList.add("hide");
  }
}
