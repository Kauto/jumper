const Spike = require('../enemyType/spike');
const _inRange = require('lodash/fp/inRange');

const data = {
  blockSize: 48,
  musicFile: '../music/dd',
  blockChecks: {
    'isVictory': _inRange(7, 9),
    'isOcuppied': _inRange(10, 20),
    'isStandable': _inRange(20, 22),
  },

  level: function () {
    let level = [];

    level[0] = '00000d000000000000000000000000000000000000000000000000000000000000000';
    level[1] = '00000d000000000000ac00000000000000000000000000000000000abbbc000000000';
    level[2] = '00000d00000000000000e000000000000000000000000000000000000000000000000';
    level[3] = '00000d0000000ac00000d0000000000lbbbbc00000000000000000e00000000000000';
    level[4] = 'bbbc0d00000000000000d0000000000k0000000000000000000000e00000000000000';
    level[5] = '00000000000000000ac000000000000k00000000ac00000000000abc0000000000000';
    level[6] = '00000000000000000000ac000000000k0000000000000000000000000000000000000';
    level[7] = '0000000000000ac0000000000000000k0000000000000000ac0000000000000000070';
    level[8] = '0000abbbbc000000000000000000000k00000000000ac000000000000000000000680';
    level[9] = '000000000000000000000000000abbbbc000000000000000000000000000000000ac0';

    return level;
  },

  load: function () {
    try {
      PIXI.loader.add('l3bg', 'assets/map/level3/bg.jpeg');

      for (let i = 1; i <= 21; i++) {
        PIXI.loader.add('l3' + i, 'assets/map/level3/j' + i + '.png');
      }
    } catch (e) {
    }
  },

  getTextureBlock: function(index) {
    console.log(index);
    return PIXI.loader.resources['l3' + index].texture;
  },

  getTextureBackground: function() {
    return PIXI.loader.resources['l3bg'].texture;
  },


  enemies: function (enemies) {
    enemies.add(new Spike(this, this.blockSize * 2, this.blockSize * 3));
    enemies.add(new Spike(this, this.blockSize * 3, this.blockSize * 3));
    enemies.add(new Spike(this, this.blockSize * 20, this.blockSize * 1));
  }
};

module.exports = data;