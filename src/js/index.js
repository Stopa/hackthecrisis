import videojs from 'video.js';
import { Publisher, PUBLISHER_EVENTS, PUBLISHER_STATUSES } from '@flussonic/flussonic-webrtc-player';
import { v4 } from 'uuid';
require('@videojs/http-streaming');

function getCamera() {
  const streamUUID = v4();

  const publisher = new Publisher(
    `wss://elektron-live.videolevels.com/elektron/${streamUUID}?password=tron`,
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

    console.log(`CLICKED SPECTATOR VIDEO AT X: ${x}; Y: ${y}`);
  });
}

window.onload = () => {
  getCamera()
  initMainStream();
  initSpectatorsStream();
}
