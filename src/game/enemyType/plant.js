const Dino = require('./dino');

class Plant extends Dino {
  constructor (levelData, x, y) {
    super(levelData, x, y);
    this.height = this.orgHeight = levelData.blockSize * 2;
    this.orgY = y;
    this.t = 0;
    this.deathLine = 0;
    this.spriteName = 'PLANT';
  }

  isLeft(hero) {
    return (this.x + this.width / 2 < hero.x + hero.width / 2);
  }

  update (level, hero) {
    this.animate();
    this.rotateEnemy(this.isLeft(hero));

    this.t = this.t + 0.021;
    let s = Math.sin(this.t);
    this.height = this.orgHeight / 2 + s * (this.orgHeight / 2 );
    this.y = this.orgY + (this.orgHeight - this.height);

    this.sprite.y = this.y;
    this.sprite.height = this.height;
  }

  load () {
    try {
      PIXI.loader.add(this.spriteName + '0', 'assets/enemies/plant/G10.png');
      PIXI.loader.add(this.spriteName + '1', 'assets/enemies/plant/G10.png');
    } catch (e) {
    }
  }
}

module.exports = Plant;