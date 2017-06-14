const Dino = require('../enemyType/dino');
const Plant = require('../enemyType/plant');

const data = {
    blockSize: 48,

    level: function () {
        let level = [];
//                            1         2         3         4         5         6         7         8         9         10        11        12        13        14        15        16        17
//                  012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        level[0] = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006666a000000000000000000000000000000000000000000000";
        level[1] = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006666a000000000000000000000000000000000000000000000";
        level[2] = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066666a000000000000000000000000000000000000000000000";
        level[3] = "00000000000000000000000000000000000000000000000000000000000000bbbb0000000000000000000000000000000000000000000000000000000bbbbb66a000000000000000000000000000000000000000000000";
        level[4] = "00000000000000000000000000000000000000000000100b0000000000000baaaa000000000000000000000000000000000000000000000000000000b6666666a000000000000000000000000000000000000000000000";
        level[5] = "000000000000000000000000000000000000000bbbbbbbbb000000bbb00000000000000000000000000000000000000000000000000000000000000b66666666a000000000000b0000bbbbb00bbbbb0b0bbbbb0bbbb000";
        level[6] = "0000000000000000000000000000000000000abaaaaaaaaa0000000000000000000000000000000000000000000001000001001000000001000000ba666aaaaaa00000000000b1b0000a010a000a000a0a000a0000a000";
        level[7] = "00b000000000000000000054000001a00bb0000aaaaaaaa000000000000a0010000000000000005400000001000aaaaaaa0b00b000b0000b00001baa6666666666000000000baaab000a0aa1000a00000a000a0aaaa007";
        level[8] = "bbab010bb00001001100002300000aa00000000aaaaaaaa01000001000aa0abbb0000000010000231011110b00000000000a00a000a0000a0000baaa666666666660a00000b00000b00a100a000a00000a011a0a000008";
        level[9] = "aaaa0abaaaabbaaabbbbbbabbaaaaaa00000000aaaaaaaaaaaaaaaaaaaaabaaaa0000000aaaaaaaaaaaaaaaa00000000000a00a000a0000a000baaaaaaaaaaaaaaaaaaaa00a00000a0aaaaa00aaaaa000aaaaa0aaaabbb";

        return level;
    },

    load: function () {
        for (let i = 0; i <= 11; i++) {
            PIXI.loader.add('j' + i, "assets/j" + i + ".png");
        }
    },

    enemies: function (enemies) {
        enemies.add(new Dino(this, this.blockSize * 12, this.blockSize * 8));
        enemies.add(new Dino(this, this.blockSize * 15, this.blockSize * 8));
        enemies.add(new Plant(this, this.blockSize * 40, this.blockSize * 3));
        enemies.add(new Dino(this, this.blockSize * 15, this.blockSize * 8, false));
        enemies.add(new Dino(this, this.blockSize * 53, this.blockSize * 8));
        enemies.add(new Dino(this, this.blockSize * 50, this.blockSize * 8));
        enemies.add(new Dino(this, this.blockSize * 121, this.blockSize * 8));

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