import axios from "axios";
import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsvolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];

  axios({
    url: `/api/${videoId}/view`,
    method: "POST"
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    // videoPlayer.volume = past volume
    // volumeRange.value = current volume
    volumeRange.value = videoPlayer.volume;
    if (volumeRange.value > 0.5) {
      volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    } else if (volumeRange.value > 0.1) {
      volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
    } else {
      volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
    }
  } else {
    videoPlayer.muted = true;
    volumeRange.value = 0;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  // eslint-disable-next-line no-use-before-define
  fullScrnBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  const currentTimeString = formatDate(Math.floor(videoPlayer.currentTime));
  currentTime.innerHTML = currentTimeString;
}

async function setTotalTime() {
  const blob = await fetch(videoPlayer.src).then(response => response.blob());
  const duration = await getBlobDuration(blob);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 500);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value > 0.5) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value > 0.1) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  }
}

async function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.oncanplay = function canplay() {
    setTotalTime();
  };
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
