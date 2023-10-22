import { Song } from "./song.js";

const titleSong = document.getElementById("title-song");
const imgSong = document.getElementById("img-song");
const listSongs = document.querySelectorAll(".song");
const musicList = document.getElementById("music-list");
const buttonPrevious = document.getElementById("button-previous");
const buttonPlay = document.getElementById("button-play");
const buttonPause = document.getElementById("button-pause");
const buttonNext = document.getElementById("button-next");
const buttonShuffle = document.getElementById("button-shuffle");
const buttonRepeat = document.getElementById("button-repeat");
const inputSongDuration = document.getElementById("song-duration");

const songsJson = {
  "songs": [
    {
      "id": 1,
      "title": "Lose Yourself",
      "image": "./images/LoseYourSelf.jpg",
      "audio": "./audios/LoseYourSelf.mp3"
    },
    {
      "id": 2,
      "title": "Ray of Solar",
      "image": "./images/RayOfSolar.jpg",
      "audio": "./audios/RayOfSolar.mp3"
    },
    {
      "id": 3,
      "title": "Middle Of The Nigth",
      "image": "./images/MiddleOfTheNigth.jpg",
      "audio": "./audios/MiddleOfTheNigth.mp3"
    }
  ]
};

let songsList = [];
let currentIdSong = 1;
let currentSong;
let audio = new Audio();
let repeatSong = false;
let shuffleSong = false;
audio.volume = 0.2;
let totalDuration;
inputSongDuration.value = 0;

inputSongDuration.addEventListener('change', () => {
  let newTime = getTotalSongDuration();
  audio.currentTime = newTime;
  inputSongDuration.value = newTime;
});

audio.addEventListener('ended', () => {
  setTimeout(() => {
    if (audio.loop === false) {
      nextSong();
    }
  }, 1000);
});

function getPercentageSongDuration() {
  return Math.floor((audio.currentTime * 100) / totalDuration);
}

function getTotalSongDuration() {
  return (inputSongDuration.value * totalDuration) / 100;
}

audio.addEventListener('durationchange', () => {
  inputSongDuration.value = 0;
  totalDuration = audio.duration;
});

audio.addEventListener('timeupdate', () => {
  inputSongDuration.value = getPercentageSongDuration();
});


Atropos({
  el: "#my-atropos",
  rotateXMax: 10,
  rotateYMax: 30,
  shadow: true,
  shadowOffset: 75,
  shadowScale: 0.9
});

buttonRepeat.addEventListener('click', () => {
  if (audio.loop === false) {
    audio.loop = true;
    buttonRepeat.classList.toggle("button-activate");
  } else {
    audio.loop = false;
    buttonRepeat.classList.remove("button-activate");
  }
});

buttonShuffle.addEventListener('click', () => {
  if (shuffleSong === false) {
    shuffleSong = true;
    buttonShuffle.classList.toggle("button-activate");
  } else {
    shuffleSong = false;
    buttonShuffle.classList.remove("button-activate");
  }
});

buttonPrevious.addEventListener('click', () => {
  previousSong();
});

buttonNext.addEventListener('click', () => {
  nextSong();
});

buttonPause.addEventListener('click', () => {
  audio.pause();
});

buttonPlay.addEventListener('click', () => {
  audio.play();
});

songsJson.songs.forEach(song => {
  let songElement = document.createElement("div");
  songElement.classList.add('song');
  let songActiveElement = document.createElement("i");
  songActiveElement.classList.toggle('bx');
  songActiveElement.classList.toggle('bxs-circle');
  songElement.appendChild(songActiveElement);
  let songTitleElement = document.createElement("p");
  songTitleElement.innerText = song.title;
  songElement.appendChild(songTitleElement);
  songElement.addEventListener('click', () => {
    setCurrentSong(song.id);
    playAudio();
  });
  musicList.appendChild(songElement);
  let newSong = new Song(song.id, song.title, song.image, song.audio);
  songsList.push(newSong);
});

setCurrentSong(currentIdSong);

function setCurrentSong(idSong) {
  currentSong = getSongById(idSong);
  currentIdSong = idSong;
  titleSong.innerText = currentSong.title;
  imgSong.src = currentSong.image;
  audio.src = currentSong.source;
  audio.load();
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}

function playAudio() {
  audio.src = currentSong.source;
  audio.play();
}

function getSongById(idSong) {
  return songsList.find(song => song.id === idSong);
}

function previousSong() {
  let newCurrentIdSong = currentIdSong - 1;
  if (newCurrentIdSong === 0) {
    newCurrentIdSong = songsList.length;
  }
  setCurrentSong(newCurrentIdSong);
  playAudio();
}

function nextSong() {
  let newCurrentIdSong;
  if (shuffleSong === true) {
    newCurrentIdSong = Math.floor(Math.random() * songsList.length) + 1;
  } else {
    newCurrentIdSong = currentIdSong + 1;
    if (newCurrentIdSong > songsList.length) {
      newCurrentIdSong = 1;
    }
  }
  setCurrentSong(newCurrentIdSong);
  playAudio();
}

