import videojs from 'video.js';
import { Publisher, PUBLISHER_EVENTS, PUBLISHER_STATUSES } from '@flussonic/flussonic-webrtc-player';
import { v4 } from 'uuid';
require('@videojs/http-streaming');

function getCamera() {
  const streamUUID = v4();

  const publisher = new Publisher(
    `wss://fo1.babahhcdn.com/elektron/${streamUUID}?password=tron`,
    {
      previewOptions: {
        autoplay: true,
        controls: false,
        muted: true,
      },
      constraints: {
        video: true,
        audio: true,
      },
      onWebsocketClose: () => console.log('websocket closed')
    },
    false, // log
  );

  publisher.on(PUBLISHER_EVENTS.STREAMING, () => {
    console.log('Streaming started');
  });
  publisher.start();
}

function initMainStream() {
  const mainStream = videojs('main-stream', { autoplay: true });
  mainStream.volume(0.1);
}

function initSpectatorsStream() {
  videojs('spectators-stream', {
    autoplay: true,
    muted: true,
    controls: false,
  });

  document.querySelector('.spectators-overlay').addEventListener('click', (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.

    fetch(`/getstream.php?x=${x}&y=${y}`)
    .then((res) => {
      return res.text();
    })
    .then((streamURL) => {
      const sourceElement = document.createElement('source'); // spectator stream source
      sourceElement.setAttribute('src', streamURL);
      sourceElement.setAttribute('type', 'application/x-mpegURL');

      const videoElement = document.createElement('video'); // spectator stream video element
      videoElement.setAttribute('id', 'spectator-stream');
      videoElement.appendChild(sourceElement);

      const container = document.querySelector('.spectator-stream .content');
      container.innerHTML = ''; // clear contents
      container.appendChild(videoElement); // append new video
      videojs('spectator-stream', { autoplay: true, muted: true, controls: false }); // initialize video.js

      document.querySelector('.stream--spectators').classList.add('show-spectator'); // show overlay
    })
    .catch(() => console.error('failed getting stream URL'));
  });

  document.querySelector('.spectator-stream .close').addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.show-spectator').classList.remove('show-spectator'); // hide overlay
    document.querySelector('.spectator-stream .content').innerHTML = ''; // remove contents
  });
}

window.onload = () => {
  getCamera()
  initMainStream();
  initSpectatorsStream();
}
