import './style.scss';
import birdsdata from '../../assets/birdsdata';
import birdQuestImg from './../../assets/img/bird.quest.jpg';
import logoHeader from './../../assets/img/logo-transparent.png';
import winSound from './../../assets/sound/win.wav';
import failSound from './../../assets/sound/fail.wav';
import { drawPlayer } from '../../player/player';

let currentNumber = 0;
let currentQuestion;
let currentBird;
let maxPoints = 5;
let points = maxPoints;
let totalPoints = 0;
let success = false;

startGame();

const quizDiv = document.querySelector('.game-header-grid');
if (quizDiv) {
  const logoA = document.createElement('a');
  logoA.href = 'index.html';
  quizDiv.prepend(logoA);
  const logoImg = document.createElement('img');
  logoImg.src = logoHeader;
  logoImg.classList.add('header-img');
  logoA.append(logoImg);
}

function startGame() {
  nextRound(currentNumber);
  updateBirdInfo(birdQuestImg, '******');

  const nextButton = document.querySelector('.next-question');
  if (nextButton) {
    nextButton.addEventListener('click', (e) => {
      if (success) {
        showNextQuestion(e);
      }
    });
  }
}

function updateNextButton() {
  const nextButton = document.querySelector('.next-question');
  nextButton.classList.toggle('active');

  if (currentNumber == birdsdata.length - 1) {
    nextButton.innerHTML = 'Показать результаты';
  }
}

function showNextQuestion() {
  if (currentNumber < birdsdata.length - 1) {
    currentNumber++;
    nextRound(currentNumber);
    updateBirdInfo(birdQuestImg, '******');
    points = maxPoints;
    success = false;
    updateNextButton();
    showInfo();
    console.log('next', points, totalPoints);
  } else {
    localStorage.setItem('points', totalPoints);
    location.href = './results.html';
  }
}

function nextRound(currentNumber) {
  currentQuestion = birdsdata[currentNumber];

  currentBird = currentQuestion[Math.floor(Math.random() * 6)];

  setGroup(currentNumber);
  setBirdAudio(currentBird.audio);

  setVariantList(currentQuestion);
}

function setGroup(currentNumber) {
  const prevGroup = document.querySelector('.question-item.active');
  if (prevGroup) {
    prevGroup.classList.toggle('active');
  }
  const currentGroup =
    document.querySelectorAll('.question-item')[currentNumber];
  if (currentGroup) {
    currentGroup.classList.toggle('active');
  }
}

function updateBirdInfo(image, name) {
  const birdImg = document.querySelector('.question-bird');
  if (birdImg) {
    birdImg.src = image;
  }
  const birdName = document.querySelector('.question-bird-name');
  if (birdName) {
    birdName.innerHTML = name;
  }
}

function setBirdAudio(audio) {
  const questionDiv = document.getElementById('question-audio-wrapper');
  if (questionDiv) {
    questionDiv.innerHTML = '';
    drawPlayer(questionDiv, audio);
  }
}

function setVariantList(group) {
  const variantsList = document.querySelector('.variant-list');
  if (variantsList) {
    variantsList.innerHTML = '';
    group.forEach((element) => {
      const variant = document.createElement('li');
      variant.dataset.number = element.id;
      variant.innerHTML = `${element.name}`;
      const detector = document.createElement('div');
      detector.classList.add('detector');
      variant.prepend(detector);
      variant.addEventListener('click', (e) => {
        checkAnsver(e.target.closest('li'));
      });
      variantsList.append(variant);
    });
  }
}

function checkAnsver(li) {
  if (!success) {
    const detector = li.querySelector('.detector');
    if (li.dataset.number == currentBird.id) {
      detector.classList.add('success');
      success = true;
      totalPoints += points;
      updateBirdInfo(currentBird.image, currentBird.name);
      updateTotalPoints();
      updateNextButton();

      const audio = new Audio(winSound);
      audio.play();

      const questAudio = document.querySelector('.question-audio');
      questAudio.pause();
    } else {
      if (!detector.classList.contains('error')) {
        detector.classList.add('error');
        points--;

        const audio = new Audio(failSound);
        audio.play();
      }
      console.log(points, totalPoints);
    }
  }
  showInfo(li.dataset.number);
}

function updateTotalPoints() {
  const scoreDiv = document.querySelector('.current-score');
  if (scoreDiv) {
    scoreDiv.innerHTML = `Счет: ${totalPoints}`;
  }
}

function showInfo(number) {
  const instruction = document.querySelector('.instruction');
  const info = document.querySelector('.variant-info');

  const variantImage = document.querySelector('.variant-bird');
  const variantName = document.querySelector('.variant-bird-name');
  const variantNameEn = document.querySelector('.variant-bird-name-en');
  const variantAudioWrapper = document.querySelector('.variant-audio-wrapper');
  const variantAudio = document.querySelector('.variant-audio');
  const variantDescriprion = document.querySelector('.variant-description');

  if (number) {
    instruction.classList.remove('active');
    info.classList.add('active');

    const variantBird = currentQuestion.find((element) => element.id == number);

    variantImage.src = variantBird.image;
    variantName.innerHTML = variantBird.name;
    variantNameEn.innerHTML = variantBird.species;
    if (variantAudioWrapper) {
      variantAudioWrapper.innerHTML = '';
      drawPlayer(variantAudioWrapper, variantBird.audio);
    }
    variantDescriprion.innerHTML = variantBird.description;
  } else {
    instruction.classList.add('active');
    info.classList.remove('active');

    variantImage.src = '#';
    variantName.innerHTML = '';
    variantNameEn.innerHTML = '';
    variantAudio.src = '#';
    variantDescriprion.innerHTML = '';
  }
}
