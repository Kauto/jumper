const Level = require('./level');
const Hero = require('./hero');
const Enemies = require('./enemies');
const Mainloop = require('./mainloop');

function Game(levelData) {
    if (!(this instanceof Game)) {
        return new Game(levelData);
    }
    this.levelData = levelData;
}

Game.prototype.run = function () {
    let level = Level(this.levelData);
    let hero = Hero(this.levelData);
    let enemies = Enemies(this.levelData);

    // Load Sprites
    this.levelData.load();
    hero.load();
    enemies.load();

    return Mainloop(level, hero, enemies).run();
};

module.exports = Game;