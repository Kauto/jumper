const Dino = require('../enemyType/dino');
const Plant = require('../enemyType/plant');

const data = {
  blockSize: 32,

  level: function () {
    let level = [];
//                         1         2         3
//               0123456789012345678901234567890
    level[ 0] = '0006666666a000000000000aaaa0000';
    level[ 1] = '0006666666a000000000000aaaa0000';
    level[ 2] = '0006666666a0000000aaa00aaaa0000';
    level[ 3] = 'aaaaaaaa66a0000000aa000aaaa0000';
    level[ 4] = 'a666666666aaaa0000aa000aaaa0000';
    level[ 5] = 'a666666666a0000000aa000aaaa0000';
    level[ 6] = 'a66aa666aaa0000100aa000aaaa0000';
    level[ 7] = 'a666aaaaa660000bbaa0000aaaa0000';
    level[ 8] = 'a66666666660bbbaaa00000aaaa0000';
    level[ 9] = 'aaaaaaaaaaaaaaaaaa00540aaaa0000';
    level[10] = 'a0000000111000000000230aaaa0000';
    level[11] = 'a000aaabbbaaaaabbbaaaaaaaaa0000';
    level[12] = 'a00000000000000000000054000007a';
    level[13] = 'a00000111100000000000023000008a';
    level[14] = 'aaaaaabaaaabbaaabbbbbbabbaaaaaa';

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

  musicFile: '../music/ken',

  enemies: function (enemies) {
    enemies.add(new Dino(this, this.blockSize * 12, this.blockSize * 13));
    enemies.add(new Dino(this, this.blockSize * 15, this.blockSize * 13, false));
    enemies.add(new Dino(this, this.blockSize * 6, this.blockSize * 6));

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