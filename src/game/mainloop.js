const Keyboard = require('./keyboard');

function Mainloop (renderer, sound) {
  if (!(this instanceof Mainloop)) return new Mainloop(renderer, sound);

  this.renderer = renderer;
  this.sound = sound;

  this.timer = null;
}

Mainloop.prototype.init = function () {
  this.key = {
    left: Keyboard(37),
    right: Keyboard(39),
    down: Keyboard(40),
    jump: Keyboard(32)
  };

  // add canvas to DOM
  document.getElementById('main').appendChild(this.renderer.view);

  // add background
  this.all = new PIXI.Container();

  this.level.addBackgroundToStage(this.all);

  this.stage = new PIXI.Container();
  this.all.addChild(this.stage);

  this.level.addSpritesToStage(this.stage);
  this.enemies.addSpritesToStage(this.stage);
  this.hero.addSpritesToStage(this.stage);

  this.g = 0.5;

  this.sound.playLoopSound('music', this.level.musicFile);

};

Mainloop.prototype.destroy = function (cb) {
  // unbind keys
  Object.keys(this.key).forEach((index) => {
    this.key[index].destroy();
  });

  // clear dom
  let myNode = document.getElementById('main');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  // clear timer
  this.timer && cancelAnimationFrame(this.timer);
  this.timer = null;

  this.sound.stopLoopSound('music', this.level.musicFile);

  cb && cb();
};

Mainloop.prototype.run = function (level, hero, enemies) {
  return new Promise((resolve, reject) => {
    this.level = level;
    this.hero = hero;
    this.enemies = enemies;

    if (PIXI.loader._queue._tasks.length) {

      document.getElementById('loading').style.display = 'block';
      document.getElementById('main').style.display = 'none';

      PIXI.loader.on('progress', (loader) => {
        let element = document.getElementById('progress');
        if (element) {
          element.style.display = 'block';
          element.value = Math.round(loader.progress);
          element.innerHTML = Math.round(loader.progress) + '%';
        }
      }).load(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        this.init();
        this.mainloop(resolve, reject);
      });
    } else {
      this.init();
      this.mainloop(resolve, reject);
    }
  });
};

Mainloop.prototype.mainloop = function (resolve, reject) {
  this.timer = requestAnimationFrame(this.mainloop.bind(this, resolve, reject));

  // move enemies
  this.enemies.update(this.level, this.hero);

  // apply schwerkraft
  this.hero.applyAdditionalForce(0, this.g);
  this.hero.updatePositionY();
  this.hero.checkAnimation();

  if (!this.hero.victory) {
    this.hero.checkVictory(this.level) && this.sound.playSound('sfx', 'bionic');
  }

  if (this.hero.victory) {
    if (this.hero.victoryAnimation(this.level)) {
      return this.destroy(resolve);
    }
  } else {
    this.hero.animate(this.key.down.isDown);

    // runterfallen + gegner
    if (!this.hero.dead) {
      this.hero.checkFloorDeath(this.level) && this.sound.playSound('sfx', 'e_laugh');
      let collision = this.enemies.collision(this.hero);
      collision && this.sound.playSound('sfx', collision);
    }

    if (this.hero.dead) {
      if (this.hero.deathAnimation(this.level)) {
        return this.destroy(reject);
      }
    } else {

      // collision detection with level
      this.hero.checkCeiling(this.level);
      this.hero.checkFloor(this.level);

      this.hero.moveInAir();

      if (this.key.right.isDown) {
        if (this.hero.canJump) {
          this.hero.ax = 3;
        } else {
          this.hero.ax = this.hero.ax + 0.25;
        }
      }
      if (this.key.left.isDown) {
        if (this.hero.canJump) {
          this.hero.ax = -3;
        } else {
          this.hero.ax = this.hero.ax - 0.25;
        }
      }

      // jumping
      if (this.key.jump.isDown && this.hero.canJump && this.jumpKey === false) {
        this.sound.playSound('sfx', 'boing');
        this.jumpKey = true;
        this.hero.ay = -11;
        this.hero.canJump = false;
        //Addpartikel 15, hero.sprite.x - LevelX, hero.sprite.y + 96, hero.sprite.x + 48 - LevelX, hero.sprite.y + 96, False
      } else {
        if (this.key.jump.isUp) this.jumpKey = false;
      }

      //check links und rechts
      this.hero.updatePositionX(this.level);

      // scrollen
      if (this.hero.x + this.stage.x > 2 * this.renderer.width / 5) {
        this.stage.x = Math.max(this.renderer.view.width - this.level.width, Math.min(2 * this.renderer.width / 5 - this.hero.x, 0));
      }
      if (this.hero.x + this.stage.x < 150) {
        this.stage.x = Math.max(this.renderer.view.width - this.level.width, Math.min(150 - this.hero.x, 0));
      }
    }
  }

  this.renderer.render(this.all);
};

module.exports = Mainloop;