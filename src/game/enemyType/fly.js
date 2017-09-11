const Dino = require('./dino');

class Fly extends Dino {

  constructor (levelData, x, y, moveToLeft = true) {
    super(...arguments);
    this.maxAniT = 20;
    this.deathLine = Math.ceil(levelData.blockSize / 3);
    this.spriteName = 'FLY';
    this.orgY = this.y;
    this.t = 0;
  }

  isLeft(hero) {
    return (this.x + this.width / 2 > hero.x + hero.width / 2);
  }

  update (level, hero) {
    if (!this.hitPoints) {
      return false;
    }

    this.animate();
    this.rotateEnemy(this.isLeft(hero));

    this.t = this.t + 0.021;
    let s = Math.sin(this.t);
    this.y = this.orgY + s * this.height;

    this.sprite.y = this.y;
  }

  load () {
    try {
      PIXI.loader.add(this.spriteName + '0', 'assets/enemies/fly/fly1.png');
      PIXI.loader.add(this.spriteName + '1', 'assets/enemies/fly/fly2.png');
    } catch (e) {
    }
  }
}

module.exports = Fly;