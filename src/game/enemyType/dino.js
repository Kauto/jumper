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
    this.spriteName = 'DINO';
  }

  addEmitter (emitters) {
    this.emitters = emitters;
    this.emitters.add('enemies.' + this.spriteName, this.getEmitterConfig());
  }

  getEmitterConfig () {
    return {
      'alpha': {
        'start': 0.53,
        'end': 0
      },
      'scale': {
        'start': 1,
        'end': 0.5,
        'minimumScaleMultiplier': 1
      },
      'color': {
        'start': '#eb1717',
        'end': '#ff1313'
      },
      'speed': {
        'start': 100,
        'end': 10,
        'minimumSpeedMultiplier': 1
      },
      'acceleration': {
        'x': 0,
        'y': 0
      },
      'maxSpeed': 0,
      'startRotation': {
        'min': 0,
        'max': 360
      },
      'noRotation': false,
      'rotationSpeed': {
        'min': 0,
        'max': 0
      },
      'lifetime': {
        'min': 0.2,
        'max': 0.8
      },
      'blendMode': 'normal',
      'frequency': 0.001,
      'emitterLifetime': 0.1,
      'maxParticles': 10,
      'pos': {
        'x': 0,
        'y': 0
      },
      'addAtBack': false,
      'spawnType': 'circle',
      'spawnCircle': {
        'x': this.width / 2,
        'y': this.height / 2,
        'r': 0
      }
    };
  }

  animate () {
    this.aniT++;

    if (this.aniT >= this.maxAniT) {
      this.aniT = 0;
      this.ani++;
      if (this.ani > this.maxAni) {
        this.ani = 0;
      }

      this.sprite.texture = PIXI.loader.resources[this.spriteName + this.ani].texture;
    }
  }

  rotateEnemy (toLeft) {
    if (toLeft) {
      this.sprite.scale.x = this.scaleValue;
      this.sprite.anchor.set(0, 0);
    }
    else {
      this.sprite.scale.x = -this.scaleValue;
      this.sprite.anchor.set(1, 0);
    }
  }

  isLeft (hero) {
    return this.ax <= 0;
  }

  update (level, hero) {
    if (!this.hitPoints) {
      return false;
    }

    this.animate();
    this.rotateEnemy(this.isLeft(hero));

    if (level.isOccupied(this.x + this.ax + (this.ax > 0 ? this.width : 0), this.y, 0, 1)) {
      this.ax = -this.ax;
    } else {
      this.x += this.ax;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  backJump (hero) {
    return -Math.abs(hero.ay) / 2;
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
          hero.ay = this.backJump(hero);
          hero.canJump = true;
          hero.canJumpDelay = 5;
          if (!this.hitPoints) {
            return this.dead(hero);
          } else {
            return this.hit(hero);
          }
        }
      }
    }
    return false;
  }

  dead (hero) {
    this.sprite.visible = false;
    this.emitters.play('enemies.' + this.spriteName, this.x, this.y);
    return 'pop';
  }

  hit (hero) {
    return false;
  }

  addSpritesToStage (stage) {
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources[this.spriteName + '0'].texture
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
      PIXI.loader.add(this.spriteName + '0', 'assets/enemies/dino/G00.png');
      PIXI.loader.add(this.spriteName + '1', 'assets/enemies/dino/G01.png');
    } catch (e) {
    }
  }
}

module.exports = Dino;