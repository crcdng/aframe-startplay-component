/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Start Play component for A-Frame.
 */
AFRAME.registerComponent('startplay', {
  schema: {
    autohide: { type: 'boolean', default: true },
    autoplay: { type: 'boolean', default: true },
    buttonId: { type: 'string', default: 'startplaybtn' },
    buttonColor: { type: 'string', default: 'black' },
    font: { type: 'asset', default: 'default' },
    position: { type: 'vec3', default: { x: 0, y: 1, z: 0 } },
    rotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
    size: { type: 'vec2', default: { x: 3, y: 1.5 } },
    text: { type: 'string', default: 'START' },
    textColor: { type: 'string', default: 'white' }
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  createButton: function (playFunction, sceneElement) {
    const button = document.createElement('a-entity');
    const clickHandler = (event) => {
      playFunction();
      if (this.data.autohide) {
        button.removeEventListener('click', clickHandler);
        button.parentNode.removeChild(button);
      }
    };

    button.setAttribute('id', this.data.buttonId);
    button.setAttribute('geometry', { primitive: 'plane', height: this.data.size.y, width: this.data.size.x });
    button.setAttribute('position', this.data.position);
    button.setAttribute('rotation', this.data.rotation);
    button.setAttribute('material', { color: this.data.buttonColor });

    button.setAttribute('text', { value: this.data.text, align: 'center', color: this.data.textColor, width: (this.data.size.x * 2 + 2) });
    button.addEventListener('click', clickHandler);
    sceneElement.appendChild(button);
  },
  // return the referenced <audio> or <video> element that should be played
  getMediaElement: function (hostElement) {
    const soundComponent = hostElement.components.sound;
    const srcAttribute = hostElement.getAttribute('src');

    // determine the video / audio element to play
    let mediaEl;
    if (soundComponent != null) {
      const name = hostElement.nodeName.toLowerCase();
      if (name === "a-sound") {
        console.log("startplay component: found a sound element that wraps a sound component");
        mediaEl = document.querySelector(srcAttribute);
      } else {
        console.log("startplay component: found an element with sound component", soundComponent);
        mediaEl = document.querySelector(soundComponent.attrValue.src);
      }
    } else if (srcAttribute != null) {
      console.log("startplay component: found an element with a src attribute");
      mediaEl = document.querySelector(srcAttribute);
    } else {
      throw new Error('startplay component: cannot identify the item to play on element: ', hostElement);
    }
    return mediaEl;
  },
  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    console.log('startplay: init');

    const el = this.el;
    this.sceneEl = el.sceneEl;

    const mediaEl = this.getMediaElement(el);
    const playFunction = mediaEl.play.bind(mediaEl); // 'this' needs to be bound to the media element
    console.log('startplay component: playFunction: ', playFunction);

    if (this.data.autoplay) {
      const autoplay = playFunction();
      if (autoplay != undefined) {
        autoplay.then(_ => {
          console.log('startplay component: autoplay works');
        }).catch(error => {
          console.log('startplay component: autoplay blocked');
          this.createButton(playFunction, this.sceneEl);
        });
      }
    } else {
      console.log('startplay component: no autoplay');
      this.createButton(playFunction, this.sceneEl);
    }
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});
