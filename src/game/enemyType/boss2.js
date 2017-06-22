const Dino = require('./dino');

class Boss2 extends Dino {
  constructor (levelData, x, y) {
    super(levelData, x, y);
    this.spriteName = 'BOSS2';
    this.maxAni = 5;
    this.maxAniT = 4;
    this.hitPoints = 5;

    this.ay = -4;
  }

  addEmitter (emitters) {
    this.emitters = emitters;
    this.emitters.add('enemies.' + this.spriteName, {
      'alpha': {
        'start': 1,
        'end': 1
      },
      'scale': {
        'start': 0.1,
        'end': 2,
        'minimumScaleMultiplier': 1
      },
      'color': {
        'start': '#ffffff',
        'end': '#ffffff'
      },
      'speed': {
        'start': 0,
        'end': 0,
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
      'noRotation': true,
      'rotationSpeed': {
        'min': 0,
        'max': 0
      },
      'lifetime': {
        'min': 7,
        'max': 7
      },
      'blendMode': 'normal',
      'frequency': 0.001,
      'emitterLifetime': 0.1,
      'maxParticles': 1,
      'pos': {
        'x': 0,
        'y': 0
      },
      'addAtBack': false,
      'spawnType': 'point'
    }, 'stephie');
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

    this.y += this.ay;
    this.ay += 0.5;
    if (this.y >= 384) {
      this.y = 384;
      this.ay = -10;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  load () {
    try {
      PIXI.loader.add(this.spriteName + '0', 'assets/enemies/boss2/RW1.png');
      PIXI.loader.add(this.spriteName + '1', 'assets/enemies/boss2/RW2.png');
      PIXI.loader.add(this.spriteName + '2', 'assets/enemies/boss2/RW3.png');
      PIXI.loader.add(this.spriteName + '3', 'assets/enemies/boss2/RW4.png');
      PIXI.loader.add(this.spriteName + '4', 'assets/enemies/boss2/RW5.png');
      PIXI.loader.add(this.spriteName + '5', 'assets/enemies/boss2/RW6.png');
      PIXI.loader.add('stephie', 'assets/stephie.png');
    } catch (e) {
    }
  }

  backJump (hero) {
    return -12;
  }

  dead (hero) {
    super.dead(hero);
    hero.victory = 1;
    return 'huhu';
  }

  hit (hero) {
    return 'schlag';
  }
}

module.exports = Boss2;