// const Snail = require('../enemyType/snail');

const data = {
  blockSize: 48,
  musicFile: '../music/dd',

  level: function () {
    let level = [];

    level[0] = '00000d0000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[1] = '00000d000000000000ac00000000000000000000000000000000000abbbc0000000000000000000000000000';
    level[2] = '00000d00000000000000e000000000000000000000000000000000b000000000000000000000000000000000';
    level[3] = '00000d0000000ac00000d0000000000kbbbbc00000000000000000b000000000000000000000000000000000';
    level[4] = 'bbbc0d00000000000000d0000000000j0000000000000000000000b000000000000000000000000000000000';
    level[5] = '00000000000000000ac000000000000j00000000ac00000000000abc00000000000000000000000000000000';
    level[6] = '00000000000000000000ac000000000j00000000000000000000000000000000000000000000000000000000';
    level[7] = '0000000000000ac0000000000000000j0000000000000000ac00000000000000000000000000000000000000';
    level[8] = '0000abbbbc000000000000000000000j00000000000ac0000000000000000000000000000000000000000000';
    level[9] = '000000000000000000000000000abbbbc0000000000000000000000000000000000000000000000000000000';

    return level;
  },

  load: function () {
    try {
      PIXI.loader.add('l2bg', 'assets/map/level2/bg.jpeg');

      for (let i = 10; i <= 14; i++) {
        PIXI.loader.add('l2' + i, 'assets/map/level2/j' + i + '.png');
      }
    } catch (e) {
      console.error(e);
    }
  },

  getTextureBlock: function(index) {
    return PIXI.loader.resources['l2' + index].texture;
  },

  getTextureBackground: function() {
    return PIXI.loader.resources['l2bg'].texture;
  },


  enemies: function (enemies) {
    // enemies.add(new Snail(this, this.blockSize * 12, this.blockSize * 8));
    // enemies.add(new Snail(this, this.blockSize * 15, this.blockSize * 8));
    // enemies.add(new Snail(this, this.blockSize * 15, this.blockSize * 8, false));
    // enemies.add(new Snail(this, this.blockSize * 53, this.blockSize * 8));
    // enemies.add(new Snail(this, this.blockSize * 50, this.blockSize * 8));
  }
};

module.exports = data;