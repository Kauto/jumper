const Dino = require('./dino');

class Snail extends Dino {
  constructor (levelData, x, y) {
    super(levelData, x, y);
    this.spriteName = 'G2';
  }

  load () {
    try {
      PIXI.loader.add('G20', 'assets/enemies/snail/snail1.png');
      PIXI.loader.add('G21', 'assets/enemies/snail/snail2.png');
    } catch (e) {
    }
  }
}

module.exports = Snail;