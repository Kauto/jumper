class Dino {

  constructor (levelData, x, y, moveToLeft = true) {
    this.width = this.height = levelData.blockSize;
    this.x = x;
    this.y = y;
    this.ax = moveToLeft ? -3 : 3;
    this.maxAni = 1;
    this.maxAniT = 5;
    this.hitPoints = 1;
    this.aniT = this.ani = 0;
    this.deathLine = Math.ceil(levelData.blockSize / 3);
  }

  animate () {
    this.aniT++;

    if (this.aniT >= this.maxAniT) {
      this.aniT = 0;
      this.ani++;
      if (this.ani > this.maxAni) {
        this.ani = 0;
      }
    }
  }

  update (level, hero) {
    if (!this.hitPoints) {
      return false;
    }

    this.animate();

    if (level.isOccupied(this.x + this.ax + (this.ax > 0 ? this.width : 0), this.y, 0, 1)) {
      this.ax = -this.ax;
    } else {
      this.x += this.ax;
    }

    this.sprite.texture = PIXI.loader.resources['G0' + this.ani + ((this.ax > 0) ? 'd' : '')].texture;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  collision (hero) {
    if (this.hitPoints) {
      if (hero.x + hero.width > this.x && hero.x < this.x + this.width) {
        if (hero.y + hero.height > this.y + this.deathLine && hero.y < this.y + this.height) {
          hero.ay = -5;
          hero.dead = 1;
          return 'e_laugh';
        }
        else if (hero.y + hero.height <= this.y + this.deathLine && hero.y + hero.height >= this.y) {
          this.hitPoints -= 1;
          hero.ay = -Math.abs(hero.ay) / 2;
          hero.canJump = true;
          hero.canJumpDelay = 5;
          if (!this.hitPoints) {

            this.sprite.visible = false;
          }
          return 'pop';
        }
      }
    }
    return false;
  }

  addSpritesToStage (stage) {
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources['G00'].texture
    );
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.width = this.width;
    this.sprite.height = this.height;

    stage.addChild(this.sprite);
  }

  load () {
    try {
      PIXI.loader.add('G00', 'assets/G00.png');
      PIXI.loader.add('G00d', 'assets/G00d.png');
      PIXI.loader.add('G01', 'assets/G01.png');
      PIXI.loader.add('G01d', 'assets/G01d.png');
    } catch (e) {
    }
  }
}

module.exports = Dino;