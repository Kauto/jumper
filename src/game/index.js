const Level = require('./level');
const Hero = require('./hero');
const Enemies = require('./enemies');
const Mainloop = require('./mainloop');

function Game (renderer, sound) {
  if (!(this instanceof Game)) {
    return new Game(renderer, sound);
  }
  this.mainloop = Mainloop(renderer, sound);
  this.renderer = renderer;
  this.sound = sound;
}

Game.prototype.run = function (levelData) {
  let level = Level(levelData);
  let hero = Hero(levelData);
  let enemies = Enemies(levelData);

  // Load Sprites
  levelData.load();
  enemies.load();
  hero.load();

  return this.mainloop.run(level, hero, enemies);
};

module.exports = Game;