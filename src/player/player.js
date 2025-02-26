import playSVG from '../assets/icon/play-button.svg';
import pauseSVG from '../assets/icon/pause-button.svg';
import './style.scss';

let playBtn = null;
let playBtnIcon = null;
let audioSong = null;
let divCurrentTime = null;
let rangeDuration = null;
let songDurationFormat = 0;
let rangeVolume = null;

export function drawPlayer(container, audio) {
  let playerWrapper = document.createElement('div');
  playerWrapper.classList.add('player-wrapper');
  container.append(playerWrapper);

  audioSong = document.createElement('audio');
  audioSong.src = audio;

  audioSong.addEventListener('timeupdate', fillCurrentTime);
  audioSong.addEventListener('ended', () => {
    playBtn.classList.toggle('play-mode');
    setBtnIcon();
  });
  audioSong.addEventListener('canplaythrough', () => {
    let songDuration = getTimePartsBySeconds(audioSong.duration);
    songDurationFormat = formateTime(songDuration);
    fillCurrentTime();
  });

  function fillCurrentTime() {
    let songTime = getTimePartsBySeconds(audioSong.currentTime);
    setCurrentDuration(audioSong.currentTime);
    divCurrentTime.innerText = `${formateTime(songTime)}/${songDurationFormat}`;
  }

  container.append(audioSong);

  divCurrentTime = document.createElement('div');
  playerWrapper.append(divCurrentTime);

  rangeVolume = document.createElement('input');
  rangeVolume.classList.add('audio-range-volume');
  rangeVolume.type = 'range';
  rangeVolume.min = 0;
  rangeVolume.max = 10;
  rangeVolume.value = 5;
  rangeVolume.addEventListener('change', (event) => {
    console.log(+event.target.value);
    audioSong.volume = +event.target.value / 10;
  });
  playerWrapper.append(rangeVolume);

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

  rangeDuration = document.createElement('input');
  rangeDuration.classList.add('audio-range-duration');
  rangeDuration.type = 'range';
  rangeDuration.min = 0;
  rangeDuration.max = 100;
  rangeDuration.value = 0;
  rangeDuration.addEventListener('change', (event) => {
    let newTime = (+event.target.value * audioSong.duration) / 100;
    audioSong.currentTime = newTime;
  });

  playerWrapper.append(rangeDuration);

  let divDurationContainer = document.createElement('div');
  divDurationContainer.classList.add('duration-container');
  playerWrapper.append(divDurationContainer);

  setBtnIcon();
}

function formateTime(time) {
  return `${time.minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${time.seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
}

function getTimePartsBySeconds(number) {
  let intSeconds = Math.floor(number);
  let hours = Math.floor(intSeconds / 3600);
  let minutes = Math.floor((intSeconds % 3600) / 60);
  let seconds = Math.floor((intSeconds % 3600) % 60);

  return { hours, minutes, seconds };
}

function setCurrentDuration(number) {
  let duration = Number.isNaN(audioSong.duration)
    ? 0
    : Math.round((number * 100) / audioSong.duration);
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
