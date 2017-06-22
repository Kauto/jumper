const Lava = require('../enemyType/lava');
const _inRange = require('lodash/fp/inRange');

const data = {
  blockSize: 48,
  musicFile: '../music/end2',
  blockChecks: {
    'isVictory': _inRange(7, 9),
    'isOcuppied': _inRange(10, 20),
    'isStandable': _inRange(20, 22),
  },
  startX: 48,
  g: 0.4,
  level: function () {
    let level = [];

    level[0] = 'b0bbbbbbbbbbbbbb';
    level[1] = 'b00000000000000b';
    level[2] = 'b00000000000000b';
    level[3] = 'b00000000000000b';
    level[4] = 'b00000000000000b';
    level[5] = 'b00000000000000b';
    level[6] = 'b00000000000000b';
    level[7] = 'b00000000000000b';
    level[8] = 'b00000000000000b';
    level[9] = 'baa00aa00aa00aab';

    return level;
  },

  load: function () {
    try {
      PIXI.loader.add('l5bg', 'assets/map/level5/bg.jpeg');

      for (let i = 10; i <= 11; i++) {
        PIXI.loader.add('l5' + i, 'assets/map/level5/j' + i + '.png');
      }
    } catch (e) {
    }
  },

  getTextureBlock: function(index) {
    return PIXI.loader.resources['l5' + index].texture;
  },

  getTextureBackground: function() {
    return PIXI.loader.resources['l5bg'].texture;
  },


  enemies: function (enemies) {
    enemies.add(new Lava(this, this.blockSize * 3, this.blockSize * 9));
    enemies.add(new Lava(this, this.blockSize * 4, this.blockSize * 9));
    enemies.add(new Lava(this, this.blockSize * 7, this.blockSize * 9));
    enemies.add(new Lava(this, this.blockSize * 8, this.blockSize * 9));
    enemies.add(new Lava(this, this.blockSize * 11, this.blockSize * 9));
    enemies.add(new Lava(this, this.blockSize * 12, this.blockSize * 9));
  }
};

module.exports = data;