import videojs from 'video.js';
require('@videojs/http-streaming');

function getCamera() {
  const video = document.getElementById('webcam-video');

  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(stream => video.srcObject = stream);
}

function initMainStream() {
  const mainStream = videojs('main-stream', { autoplay: true });
  mainStream.volume(0.1);
}

window.onload = () => {
  getCamera()
  initMainStream();
}
