require('pixi.js');

const Intro = require('./intro/index').default;
const Game = require('./game/index');
const AudioManager = require('audio-manager');

let audioManager = new AudioManager(['music', 'sfx']);
audioManager.init();
audioManager.settings.audioPath = 'assets/sound/';
audioManager.setVolume('music', 1);
audioManager.setVolume('sfx', 1);
audioManager.createSound('boing').load();
audioManager.createSound('pop').load();
audioManager.createSound('e_laugh').load();
audioManager.createSound('e_laugh').load();
audioManager.createSound('intro').load();
audioManager.createSound('ding').load();
audioManager.createSound('gestoehn').load();

const renderer = PIXI.autoDetectRenderer(800, 480);

function loop () {
  Intro(audioManager)
    .then(() => {
      return Game(renderer, audioManager).run(require('./game/levels/1'));
    })
    .then(() => {
      alert('Win!');
      loop();
    })
    .catch((e) => {
      console.error(e);
      alert('Game Over!');
      loop();
    });
}

document.getElementById('loading').style.display = 'none';
document.getElementById('main').style.display = 'block';
document.getElementById('fullscreen').addEventListener('click', () => {
  var elem = document.getElementById('main');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
});
document.getElementById('start').addEventListener('click', () => {
  // clear dom
  let myNode = document.getElementById('main');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  loop();
});