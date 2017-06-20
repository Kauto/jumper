const Dino = require('../enemyType/dino');
const Plant = require('../enemyType/plant');

const data = {
  blockSize: 48,

  level: function () {
    let level = [];
//                        1         2         3         4         5         6         7         8
//              0123456789012345678901234567890123456789012345678901234567890123456789012345678901234563456789
    level[0] = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[1] = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[2] = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    level[3] = '00000000000000000000000000000000000000000000000000000000000000bbbb0000000000000000000000';
    level[4] = '00000000000000000000000000000000000000000000000b0000000000000baaaa0000000000000000000000';
    level[5] = '000000000000000000000000000000000000000bbbbbbbbb000000bbb0000000000000000000000000000000';
    level[6] = '0000000000000000000000000000000000000abaaaaaaaaa0000000000000000000000000000000000000000';
    level[7] = '00b000000000000000000054000001a00bb0000aaaaaaaa000000000000a0010000000000000005400000007';
    level[8] = 'bbab010bb00001001100002300000aa00000000aaaaaaaa01000001000aa0abbb00000000100002310111108';
    level[9] = 'aaaa0abaaaabbaaabbbbbbabbaaaaaa00000000aaaaaaaaaaaaaaaaaaaaabaaaa0000000aaaaaaaaaaaaaaab';

    return level;
  },

  load: function () {
    try {
      for (let i = 0; i <= 11; i++) {
        PIXI.loader.add('j' + i, 'assets/j' + i + '.png');
      }
    } catch (e) {}
  },

  getTextureBlock: function(index) {
    return PIXI.loader.resources['j' + index].texture;
  },

  getTextureBackground: function() {
    return PIXI.loader.resources['j0'].texture;
  },

  musicFile: '../music/guile',

  enemies: function (enemies) {
    enemies.add(new Dino(this, this.blockSize * 12, this.blockSize * 8));
    enemies.add(new Dino(this, this.blockSize * 15, this.blockSize * 8));
    enemies.add(new Plant(this, this.blockSize * 40, this.blockSize * 3));
    enemies.add(new Dino(this, this.blockSize * 15, this.blockSize * 8, false));
    enemies.add(new Dino(this, this.blockSize * 53, this.blockSize * 8));
    enemies.add(new Dino(this, this.blockSize * 50, this.blockSize * 8));

    /*

     With Gegner(3)
     .Enabled = True
     .GegnerArt = 1
     .Ani = 0
     .AniT = 0
     .SX = GegnerArt(.GegnerArt).Speed
     .x = 48 * 40
     .y = 48 * 4 - GegnerArt(.GegnerArt).H
     .RY = 0
     .RX = 48 + GegnerArt(.GegnerArt).W * 2
     .Gedreht = 0
     .Shown = False
     .Boden = 0
     End With


     'Vogel
     With Gegner(6)
     .Enabled = True
     .GegnerArt = 3
     .Ani = 0
     .AniT = 0
     .SX = -GegnerArt(.GegnerArt).Speed
     .x = 48 * 0
     .y = 48 * 3 - GegnerArt(.GegnerArt).H
     .GrenzeX1 = 48 * 0
     .GrenzeX2 = 48 * 5
     .RY = 96
     .RX = GegnerArt(.GegnerArt).W * 2
     .Gedreht = 0
     .Shown = False
     .Boden = 0
     End With

     With Gegner(7)
     .Enabled = True
     .GegnerArt = 3
     .Ani = 0
     .AniT = 0
     .SX = -GegnerArt(.GegnerArt).Speed
     .x = 48 * 91
     .y = 48 * 5 - GegnerArt(.GegnerArt).H
     .GrenzeX1 = 48 * 91
     .GrenzeX2 = 48 * 97
     .RY = 96
     .RX = GegnerArt(.GegnerArt).W * 3
     .Gedreht = 0
     .Shown = False
     .Boden = 0
     End With

     With Gegner(8)
     .Enabled = True
     .GegnerArt = 3
     .Ani = 0
     .AniT = 0
     .SX = -GegnerArt(.GegnerArt).Speed
     .x = 48 * 112
     .y = 48 * 6 - GegnerArt(.GegnerArt).H
     .GrenzeX1 = 48 * 112
     .GrenzeX2 = 48 * 117
     .RY = 96
     .RX = GegnerArt(.GegnerArt).W * 4
     .Gedreht = 0
     .Shown = False
     .Boden = 0
     End With

     'Hund
     With Gegner(9)
     .Enabled = True
     .GegnerArt = 2
     .Ani = 0
     .AniT = 0
     .SX = -GegnerArt(.GegnerArt).Speed
     .x = 48 * 78
     .y = 48 * 8 - GegnerArt(.GegnerArt).H
     .GrenzeX1 = 48 * 75
     .GrenzeX2 = 48 * 86
     .RY = 0
     .RX = 48 + GegnerArt(.GegnerArt).W * 3
     .Gedreht = 0
     .Shown = False
     End With

     With Gegner(10)
     .Enabled = True
     .GegnerArt = 2
     .Ani = 0
     .AniT = 0
     .SX = -GegnerArt(.GegnerArt).Speed
     .x = 48 * 82
     .y = 48 * 8 - GegnerArt(.GegnerArt).H
     .GrenzeX1 = 48 * 75
     .GrenzeX2 = 48 * 86
     .RY = 96
     .RX = GegnerArt(.GegnerArt).W * 4
     .Gedreht = 0
     .Shown = False
     End With
     */
  }
};

module.exports = data;