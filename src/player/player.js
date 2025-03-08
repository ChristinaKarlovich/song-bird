import playPNG from '../assets/icon/play.png';
import pausePNG from '../assets/icon/pause.png';
import volumePNG from '../assets/icon/volume.png';
import mutePNG from '../assets/icon/mute.png';
import './style.scss';

let playBtn = null;
let playBtnIcon = null;
let audioSong = null;
let divCurrentTime = null;
let rangeDuration = null;
let songDurationFormat = 0;
let rangeVolume = null;
let volumeBtnIcon = null;

export function drawPlayer(container, audio) {
  let playerWrapper = document.createElement('div');
  playerWrapper.classList.add('player-wrapper');
  container.append(playerWrapper);

  audioSong = document.createElement('audio');
  audioSong.src = audio;

  audioSong.addEventListener('timeupdate', fillCurrentTime);
  audioSong.addEventListener('ended', () => {
    playBtn.classList.toggle('play-mode');
    audioSong.currentTime = 0;
    setBtnIcon();
  });
  audioSong.addEventListener('canplaythrough', () => {
    let songDuration = getTimePartsBySeconds(audioSong.duration);
    songDurationFormat = formateTime(songDuration);
    audioSong.volume = 0.5;
    rangeVolume.value = audioSong.volume * 10;
    rangeVolume.style.background =
      'linear-gradient(to right,#ffffff ' +
      rangeVolume.value * 10 +
      '%,#ffffff80 ' +
      rangeVolume.value * 10 +
      '%)';
    fillCurrentTime();
  });

  function fillCurrentTime() {
    let songTime = getTimePartsBySeconds(audioSong.currentTime);
    setCurrentDuration(audioSong.currentTime);
    divCurrentTime.innerText = `${formateTime(
      songTime,
    )} / ${songDurationFormat}`;
  }

  container.append(audioSong);

  let divAudioControlsWrapper = document.createElement('div');
  divAudioControlsWrapper.classList.add('audio-controles-wrapper');
  playerWrapper.append(divAudioControlsWrapper);

  divCurrentTime = document.createElement('div');
  divAudioControlsWrapper.append(divCurrentTime);

  playBtn = document.createElement('div');
  playBtn.classList.add('play-btn');
  playBtn.id = 'play-bause-btn';
  playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('play-mode');
    setBtnIcon();
    playpauseAudio();
  });
  divAudioControlsWrapper.append(playBtn);

  let divVolumeWrapper = document.createElement('div');
  divVolumeWrapper.classList.add('volume-wrapper');
  divAudioControlsWrapper.append(divVolumeWrapper);

  volumeBtnIcon = document.createElement('img');
  volumeBtnIcon.addEventListener('click', () => {
    if (rangeVolume.value == 0) {
      volumeBtnIcon.src = volumePNG;
      rangeVolume.value = 5;
      audioSong.volume = 0.5;
      rangeVolume.style.background =
        'linear-gradient(to right,#ffffff ' + 50 + '%,#ffffff80 ' + 50 + '%)';
    } else {
      volumeBtnIcon.src = mutePNG;
      rangeVolume.value = 0;
      audioSong.volume = 0;
      rangeVolume.style.background =
        'linear-gradient(to right,#ffffff ' + 0 + '%,#ffffff80 ' + 0 + '%)';
    }
  });
  volumeBtnIcon.src = volumePNG;
  divVolumeWrapper.append(volumeBtnIcon);

  rangeVolume = document.createElement('input');
  rangeVolume.classList.add('audio-range-volume');
  rangeVolume.type = 'range';
  rangeVolume.min = 0;
  rangeVolume.max = 10;
  rangeVolume.addEventListener('change', (event) => {
    +event.target.value === 0
      ? (volumeBtnIcon.src = mutePNG)
      : (volumeBtnIcon.src = volumePNG);

    audioSong.volume = +event.target.value / 10;
    rangeVolume.style.background =
      'linear-gradient(to right,#ffffff ' +
      +event.target.value * 10 +
      '%,#ffffff80 ' +
      +event.target.value * 10 +
      '%)';
  });
  divVolumeWrapper.append(rangeVolume);

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
    ? pausePNG
    : playPNG;
}

export function playpauseAudio() {
  playBtn.classList.contains('play-mode')
    ? audioSong.play()
    : audioSong.pause();
}
