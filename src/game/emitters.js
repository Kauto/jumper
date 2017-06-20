const _isArray = require('lodash/isArray');

function Emitters (renderer, stage, levelData) {
  if (!(this instanceof Emitters)) return new Emitters(renderer, stage, levelData);
  this.list = {};
  this.stage = stage;
  this.renderer = renderer;
  this.levelData = levelData;
}

Emitters.prototype.destroy = function () {
  Object.keys(this.list).forEach((index) => {
    this.list[index].destroy();
    delete this.list[index];
  });
  this.list = {};
  if (this.renderer.plugins && this.renderer.plugins.sprite && this.renderer.plugins.sprite.sprites)
    this.renderer.plugins.sprite.sprites.length = 0;
};

Emitters.prototype.add = function (name, config, texture = 'particle') {
  if (this.list[name]) {
    this.list[name].destroy();
  }
  this.list[name] = this.create(config, texture);
  this.list[name].emit = false;
};

Emitters.prototype.update = function (elapsedTime) {
  Object.keys(this.list).forEach((index) => {
    this.list[index].update(elapsedTime);
  });
};

Emitters.prototype.play = function (name, x, y) {
  if (!this.list[name]) return;
  this.list[name].emit = true;
  this.list[name].resetPositionTracking();
  this.list[name].updateOwnerPos(x, y);
};

Emitters.prototype.create = function (config, texture = 'particle') {
  return new PIXI.particles.Emitter(
    // The PIXI.Container to put the emitter in
    // if using blend modes, it's important to put this
    // on top of a bitmap, and not use the root stage Container
    this.stage,

    // The collection of particle images to use
    _isArray(texture) ? texture : [PIXI.loader.resources[texture].texture],

    config
  );
};

Emitters.prototype.hero_jump = function () {
  this.add('hero.jump',
    {
      'alpha': {
        'start': 1,
        'end': 0
      },
      'scale': {
        'start': 0.1,
        'end': 0.01,
        'minimumScaleMultiplier': 1
      },
      'color': {
        'start': '#e4f9ff',
        'end': '#3fcbff'
      },
      'speed': {
        'start': 150,
        'end': 50,
        'minimumSpeedMultiplier': 1
      },
      'acceleration': {
        'x': 0,
        'y': 0
      },
      'maxSpeed': 0,
      'startRotation': {
        'min': 180,
        'max': 360
      },
      'noRotation': true,
      'lifetime': {
        'min': 0.2,
        'max': 0.8
      },
      'blendMode': 'normal',
      'frequency': 0.001,
      'emitterLifetime': 0.2,
      'maxParticles': 50,
      'pos': {
        'x': 0,
        'y': 0
      },
      'addAtBack': false,
      'spawnType': 'rect',
      'spawnRect': {
        'x': 0,
        'y': 0,
        'w': this.levelData.blockSize,
        'h': 0
      }
    });
};

module.exports = Emitters;