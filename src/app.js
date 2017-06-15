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

//noinspection InfiniteLoopJS
function loop() {
    Intro()
        .then(() => {
            return Game(require('./game/levels/1'), audioManager).run()
        })
        .then(() => {
            alert('Win!');
            loop();
        })
        .catch(() => {
            alert('Game Over!');
            loop();
        });
}

loop();