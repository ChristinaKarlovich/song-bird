import playSVG from '../assets/icon/play-button.svg';
import pauseSVG from '../assets/icon/pause-button.svg';
import './style.scss';

let playBtn = null;
let playBtnIcon = null;
let audioSong = null;
let divCurrentTime = null;
let rangeDuration = null;

export function drawPlayer(container, audio) {
  let playerWrapper = document.createElement('div');
  playerWrapper.classList.add('player-wrapper');
  container.append(playerWrapper);

  audioSong = document.createElement('audio');
  audioSong.src = audio;

  audioSong.addEventListener('timeupdate', (event) => {
    console.log(getTimePartsBySeconds(audioSong.currentTime));
    let songTime = getTimePartsBySeconds(audioSong.currentTime);
    setCurrentDuration(audioSong.currentTime);
    divCurrentTime.innerText = `${songTime.minutes.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${songTime.seconds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  });
  audioSong.addEventListener('ended', () => {
    playBtn.classList.toggle('play-mode');
    setBtnIcon();
  });

  container.append(audioSong);

  playBtn = document.createElement('div');
  playBtn.classList.add('play-btn');
  playBtn.id = 'play-bause-btn';
  playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('play-mode');
    setBtnIcon();
    playpauseAudio();
  });
  playerWrapper.append(playBtn);

  playBtnIcon = document.createElement('img');
  playBtnIcon.classList.add('play-pause-icon');
  playBtn.append(playBtnIcon);

  divCurrentTime = document.createElement('div');
  let songTime = getTimePartsBySeconds(audioSong.currentTime);
  divCurrentTime.innerText = `${songTime.minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${songTime.seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;

  rangeDuration = document.createElement('input');
  rangeDuration.classList.add('audio-range-duration');
  rangeDuration.type = 'range';
  rangeDuration.min = 0;
  rangeDuration.max = 100;
  rangeDuration.value = 0;
  playerWrapper.append(rangeDuration);

  let divDurationContainer = document.createElement('div');
  divDurationContainer.classList.add('duration-container');
  playerWrapper.append(divDurationContainer);

  playerWrapper.append(divCurrentTime);

  setBtnIcon();
}

function getTimePartsBySeconds(number) {
  let intSeconds = Math.floor(number);
  let hours = Math.floor(intSeconds / 3600);
  let minutes = Math.floor((intSeconds % 3600) / 60);
  let seconds = Math.floor((intSeconds % 3600) % 60);

  return { hours, minutes, seconds };
}

function setCurrentDuration(number) {
  let duration = Math.round((number * 100) / audioSong.duration);
  rangeDuration.value = duration;
  rangeDuration.style.background =
    'linear-gradient(to right,#ffffff ' +
    duration +
    '%,#ffffff80 ' +
    duration +
    '%)';
  console.log(duration);
}

function setBtnIcon() {
  playBtnIcon.src = playBtn.classList.contains('play-mode')
    ? pauseSVG
    : playSVG;
}

export function playpauseAudio() {
  playBtn.classList.contains('play-mode')
    ? audioSong.play()
    : audioSong.pause();
}
