// const Snail = require('../enemyType/snail');

const data = {
  blockSize: 48,
  musicFile: '../music/dd',

  level: function () {
    let level = [];

    level[0] = '00000d0000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[1] = '000000d000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[2] = '00000d0000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[3] = '000000d000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[4] = 'bbbc0d0000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[5] = '00000000000000000ac000000000000000000000000000000000000000000000000000000000000000000000';
    level[6] = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[7] = '0000000000000ac0000000000000000000000000000000000000000000000000000000000000000000000000';
    level[8] = '0000abbbbc000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[9] = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

    return level;
  },

  load: function () {
    try {
      PIXI.loader.add('l2bg', 'assets/map/level2/bg.jpeg');

      for (let i = 10; i <= 13; i++) {
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