## aframe-startplay-component

[![Version](http://img.shields.io/npm/v/aframe-startplay-component.svg?style=flat-square)](https://npmjs.org/package/aframe-startplay-component)
[![License](http://img.shields.io/npm/l/aframe-startplay-component.svg?style=flat-square)](https://npmjs.org/package/aframe-startplay-component)

Many environments, especially mobile browsers, are blocking autoplay of audio or video and require an user interaction instead. Policies and rules that govern this behavior are constantly changing. Yet we would like to play background music or video textures in our VR scenes.

This component attempts to autoplay an audio/video element and provides a button for user interaction as a fallback option. You need a non-fuse cursor element / controller that can trigger a `click` event on the button. Make sure to set the position/rotation of the button relative to your start position. 

Built to work with `<a-sound>`, `<a-video>`, `<a-videosphere>`, `<a-entity src="#video_id">`, `<a-entity sound="src: #audio_id">`.

** The development is in an early stage. You can help improving it by checking out the examples, experimenting with it and submitting bug reports / pull requests. ** When the component is somewhat stable and has been tested a bit, I will add it on npm.

Check out the [examples](examples).

### To-do list:

* Test a lot on different device / browser combinations and test with A-Frame 9.x
* Check that media is loaded before autoplay attempt
* Bundle the default font with webpack. Currently the Roboto font is loaded from a CDN (de-faulty behavior for the `text` component. This breaks the app in an Intranet scenario, where you would have a local server and no web access.)
* Add font choices (font, size, color)
* Add material choices for the Button
* Maybe add a muted video autoplay option, where videos are played automatically and can be unmuted manually
* Maybe add the option to enter VR mode with the action

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| autohide | Shall the Button go away after being clicked? | true |
| autoplay | Attempt to autoplay the element? | yes |
| buttonId | Id of the Button           | "startplaybtn"              |
| buttonColor | Color of the Button            | "black"              |
| position | Button position        | { x: 0, y: 0, z: 0 } |
| rotation | Button rotation        | { x: 0, y: 0, z: 0 } |
| size     | Button size            | { x: 3, y: 1.5 } |
| text     | Button text            | "START" |
| textColor | Color of the Text            | "white"              |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-startplay-component/dist/aframe-startplay-component.min.js"></script>
</head>

<body>
  <a-assets>
    <audio id="background" src="music.mp3"><audio>
  </a-assets>
  <a-scene>
    <a-sound src="#background" startplay></a-entity>
  </a-scene>
</body>
```

#### npm (NOT OPERATIONAL AT THE MOMENT)

Install via npm:

```bash
npm install aframe-startplay-component
```

Then require and use.

```js
require('aframe');
require('aframe-startplay-component');
```
