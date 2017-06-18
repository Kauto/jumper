const Level = require('./level');
const Hero = require('./hero');
const Enemies = require('./enemies');
const Mainloop = require('./mainloop');

function Game(levelData, sound) {
    if (!(this instanceof Game)) {
        return new Game(levelData, sound);
    }
    this.levelData = levelData;
    this.sound = sound;
}

Game.prototype.run = function () {
    let level = Level(this.levelData);
    let hero = Hero(this.levelData);
    let enemies = Enemies(this.levelData);

    // Load Sprites
    this.levelData.load();
    enemies.load();
    hero.load();

    return Mainloop(level, hero, enemies, this.sound).run();
};

module.exports = Game;