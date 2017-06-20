const Snail = require('../enemyType/snail');

const data = {
  blockSize: 48,
  musicFile: '../music/guile',

  level: function () {
    let level = [];

    level[0] = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[1] = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[2] = '0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000';
    level[3] = '00000000000000000000000000000000000000000000000000000000000000bbbd0000000000000000000000';
    level[4] = '00000000000000000000000000000000000000004003000f0000000040000eaaa00000000000000000000000';
    level[5] = '000000000000000000000000000000000000000bbbbbbbbd000000ghhi000000000000000000000000000000';
    level[6] = '0000000000000000000000000000000000400ebaaaaaaaa00000000000000000000000000000000000000000';
    level[7] = '00f000000000000000000000000000f00ed0000aaaaaaaa000000000000f0012000000000000000000000007';
    level[8] = 'bbad004ff00001002210040300200fa00000000aaaaaaaa01020121040ff0fbbb00000000100304010221068';
    level[9] = 'aaa00ebaaaabbaaabbbbbbabbaaaaaa00000000aaaaaaaaaaaaaaaaaaaaabaaaa0000000eabbbbbaabbbabab';

    return level;
  },

  load: function () {
    try {
      PIXI.loader.add('l1bg', 'assets/map/level1/bg.jpeg');

      for (let i = 1; i <= 18; i++) {
        i !== 9 && PIXI.loader.add('l1' + i, 'assets/map/level1/j' + i + '.png');
      }
    } catch (e) {}
  },

  getTextureBlock: function(index) {
    return PIXI.loader.resources['l1' + index].texture;
  },

  getTextureBackground: function() {
    return PIXI.loader.resources['l1bg'].texture;
  },


  enemies: function (enemies) {
    enemies.add(new Snail(this, this.blockSize * 12, this.blockSize * 8));
    enemies.add(new Snail(this, this.blockSize * 15, this.blockSize * 8));
    enemies.add(new Snail(this, this.blockSize * 15, this.blockSize * 8, false));
    enemies.add(new Snail(this, this.blockSize * 53, this.blockSize * 8));
    enemies.add(new Snail(this, this.blockSize * 50, this.blockSize * 8));
  }
};

module.exports = data;