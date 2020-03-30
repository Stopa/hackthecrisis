import videojs from 'video.js';
import { Publisher, PUBLISHER_EVENTS, PUBLISHER_STATUSES } from '@flussonic/flussonic-webrtc-player';
import { v4 } from 'uuid';
require('@videojs/http-streaming');

function getCamera() {
  const previewElement = document.getElementById('webcam-video');

  const streamUUID = v4();

  const publisher = new Publisher(
    `wss://live-streamer.videolevels.com/elektron/${streamUUID}?password=tron`,
    {
      preview: previewElement,
      previewOptions: {
        autoplay: true,
        controls: false,
        muted: true,
      },
      constraints: {
        video: true,
        audio: false,
      },
      onWebsocketClose: () => console.log('websocket closed')
    },
    true,
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

window.onload = () => {
  getCamera()
  initMainStream();
}
