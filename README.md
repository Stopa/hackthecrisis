# #hackthecrisis e⁻lektron

A front-end application for a collaborative performance viewing platform.

## Getting started

Prerequisites:
* Node
* Yarn

1. Install dependencies: `yarn`
2. Run dev server: `yarn start`
3. Open `localhost:8080` in your browser (webcam streaming seems to work only in Safari for now)

## Todo:

1. Proper stream URL for the performance video (`index.html:15`)
2. Listen to click on the performance video, figure out the stream URL for the "selected audience member" and set it as source of `#audience-member` video
