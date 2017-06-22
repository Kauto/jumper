const Boss1 = require('../enemyType/boss1');
const _inRange = require('lodash/fp/inRange');

const data = {
  blockSize: 48,
  musicFile: '../music/end1',
  blockChecks: {
    'isVictory': _inRange(7, 9),
    'isOcuppied': _inRange(10, 20),
    'isStandable': _inRange(20, 22),
  },
  startX: 48,
  g: 0.3,
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
    level[9] = 'baaaaaaaaaaaaaab';

    return level;
  },

  load: function () {
    try {
      PIXI.loader.add('l4bg', 'assets/map/level4/bg.jpeg');

      for (let i = 10; i <= 11; i++) {
        PIXI.loader.add('l4' + i, 'assets/map/level4/j' + i + '.png');
      }
    } catch (e) {
    }
  },

  getTextureBlock: function(index) {
    return PIXI.loader.resources['l4' + index].texture;
  },

  getTextureBackground: function() {
    return PIXI.loader.resources['l4bg'].texture;
  },


  enemies: function (enemies) {
    enemies.add(new Boss1(this, this.blockSize * 14, this.blockSize * 7));
  }
};

module.exports = data;