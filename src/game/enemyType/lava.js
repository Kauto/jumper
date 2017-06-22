class Lava {

  constructor (levelData, x, y, moveToLeft = true) {
    this.width = this.height = levelData.blockSize;
    this.x = x;
    this.y = y;
    this.ax = 0;
    this.maxAni = 1;
    this.maxAniT = 10;
    this.hitPoints = 1000;
    this.aniT = this.ani = 0;
    this.deathLine = Math.ceil(levelData.blockSize / 2);
    this.spriteName = 'SPIKE';
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

  collision (hero) {
    if (this.hitPoints) {
      if (hero.x + hero.width > this.x && hero.x < this.x + this.width) {
        if (hero.y + hero.height > this.y + this.deathLine && hero.y < this.y + this.height) {
          hero.ay = -5;
          hero.dead = 1;
          return 'e_laugh';
        }
      }
    }
    return false;
  }

  addSpritesToStage (stage) {
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources[this.spriteName].texture
    );
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.width = this.width;
    this.sprite.height = this.height;

    this.scaleValue = this.sprite.scale.x;

    stage.addChild(this.sprite);
  }

  load () {
    try {
      PIXI.loader.add(this.spriteName, 'assets/enemies/spike/spike.png');
    } catch (e) {
    }
  }
}

module.exports = Lava;