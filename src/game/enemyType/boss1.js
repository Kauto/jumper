const Dino = require('./dino');

class Boss1 extends Dino {
  constructor (levelData, x, y) {
    super(levelData, x, y);
    this.spriteName = 'BOSS1';
    this.height = 96;
    this.maxAni = 5;
    this.maxAniT = 2;
    this.hitPoints = 5;
    this.moveToLeft = true;
    this.ax = 0;
    this.dizy = 0;
  }

  isLeft (hero) {
    return this.moveToLeft;
  }

  update (level, hero) {
    if (!this.hitPoints) {
      return false;
    }

    this.rotateEnemy(this.isLeft(hero));

    if (this.dizy) {
      this.height = 96;
      this.width = 96;
      this.sprite.texture = PIXI.loader.resources[this.spriteName + '6'].texture;
      this.dizy--;
      if (this.dizy === 0) {
        this.moveToLeft = !this.moveToLeft;
        this.height = 96;
        this.width = 48;
      }
      if (this.dizy === 99) {
        if (!this.moveToLeft) {
          this.sprite.x -= 48;
        }
        level.rumble = 10;
        return 'schlag2';
      }
      return false;
    }

    this.maxAniT = (Math.abs(this.ax) > 5) ? 1 : 2;
    this.animate();

    if (this.moveToLeft) {
      this.ax -= 0.15;
    } else {
      this.ax += 0.15;
    }

    if (level.isOccupied(this.x + this.ax + (this.ax > 0 ? this.width : 0), this.y, 0, 1)) {
      this.ax = 0;
      this.dizy = 100;
    } else {
      this.x += this.ax;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  load () {
    try {
      PIXI.loader.add('BOSS10', 'assets/enemies/boss1/e1a.png');
      PIXI.loader.add('BOSS11', 'assets/enemies/boss1/e2a.png');
      PIXI.loader.add('BOSS12', 'assets/enemies/boss1/e3a.png');
      PIXI.loader.add('BOSS13', 'assets/enemies/boss1/e4a.png');
      PIXI.loader.add('BOSS14', 'assets/enemies/boss1/e5a.png');
      PIXI.loader.add('BOSS15', 'assets/enemies/boss1/e6a.png');
      PIXI.loader.add('BOSS16', 'assets/enemies/boss1/e7a.png');
    } catch (e) {
    }
  }

  backJump (hero) {
    return -12;
  }

  dead (hero) {
    super.dead(hero);
    hero.victory = 1;
    return 'bionic';
  }

  hit (hero) {
    return 'schlag';
  }
}

module.exports = Boss1;