const Spike = require('./spike');

class Lava extends Spike {

  constructor (levelData, x, y, moveToLeft = true) {
		super(...arguments);

    this.maxAni = 1;
    this.maxAniT = 10;
    this.hitPoints = 1000;
    this.aniT = this.ani = 0;
    this.deathLine = Math.ceil(levelData.blockSize / 2);
    this.spriteName = 'LAVA';
		this.ani = 0;
  }

	addEmitter (emitters) {
    this.emitters = emitters;
  }

	update (level, hero) {
		this.animate();
	}

  animate () {
		this.aniT++;
    if (this.aniT >= this.maxAniT) {
			if (this.ani) {
				this.sprite.scale.x = -this.scaleValue;
				this.sprite.anchor.set(1, 0);
				this.ani = 0;
			}
			else {
				this.sprite.scale.x = this.scaleValue;
				this.sprite.anchor.set(0, 0);
				this.ani++;
			}

			this.aniT = 0;
    }
  }

  load () {
    try {
      PIXI.loader.add(this.spriteName, 'assets/enemies/lava/lava.png');
    } catch (e) {
    }
  }
}

module.exports = Lava;