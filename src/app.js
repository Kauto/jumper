require('pixi.js');
require('pixi-particles');

PIXI.loader.add('particle', 'assets/particle.png');

const Intro = require('./cutscenes/intro').default;
const Death = require('./cutscenes/death').default;
const Win = require('./cutscenes/win').default;
const Outro = require('./cutscenes/outro').default;
const Cut1 = require('./cutscenes/cut1').default;
const Game = require('./game/index');
const AudioManager = require('audio-manager');

let audioManager = new AudioManager(['music', 'sfx']);
audioManager.settings.audioPath = 'assets/sound/';
audioManager.setVolume('music', 1);
audioManager.setVolume('sfx', 1);
// intro
audioManager.createSound('ding').load();
audioManager.createSound('dog').load();
audioManager.createSound('gestoehn').load();
audioManager.createSound('intro').load();
// game
audioManager.createSound('boing').load();
audioManager.createSound('pop').load();
audioManager.createSound('e_laugh').load();
audioManager.createSound('bionic').load();
// cutscenes
audioManager.createSound('whip').load();
audioManager.createSound('schlag').load();
audioManager.createSound('schall').load();
// outro
audioManager.createSound('gestoehn2').load();
audioManager.createSound('electric').load();

const renderer = PIXI.autoDetectRenderer(800, 480);
const game = Game(renderer, audioManager);

function loop () {
  level(0);
}
const levels = [
  () => Intro(audioManager),
  () => game.run(require('./game/levels/1')),
  () => Win(audioManager, 1, 'Nicht die Abwesenheit der Liebe, sondern die Abwesenheit der Freundschaft macht die unglücklichen Ehen. - Dennis Foppe'),
  () => Cut1(audioManager),
  () => game.run(require('./game/levels/2')),
  () => Win(audioManager, 2, 'Wenn die Ehegatten nicht beisammen lebten, würden die guten Ehen häufiger sein. - Andre Schaf'),
  () => game.run(require('./game/levels/3')),
  () => Win(audioManager, 3, 'Die Ehe ist die verlogenste Form des Geschlechtsverkehrs; und eben deshalb hat sie das gute Gewissen auf ihrer Seite - Markus Madeja'),
  () => Outro(audioManager)
];
function level (pos) {
  levels[pos]()
    .then(() => {
      level(pos + 1);
    })
    .catch((e) => {
      if (e) {
        console.error(e);
      }
      Death(audioManager).then(() => level(pos));
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
  // init in a click event to work with audio-protection
  audioManager.init();

  // clear dom
  let myNode = document.getElementById('main');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  loop();
});