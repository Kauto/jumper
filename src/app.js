require('pixi.js');

const Game = require('./game/index');
const SoundFX = require('sound-fx');

let sound = new SoundFX();

sound.load('/assets/sound/boing.mp3', 'jump');
sound.load('/assets/sound/pop.mp3', 'pop');
sound.load('/assets/sound/e_laught.mp3', 'death');
//sound.load('/assets/music/jump.mp3', 'music');

Game(require('./game/levels/1'), sound).run().then(()=>alert('Win!')).catch(()=>alert('Game Over!'));



   /*
PIXI.loader.add('G00', "assets/G00.png");
PIXI.loader.add('G00d', "assets/G00d.png");
PIXI.loader.add('G01', "assets/G01.png");
PIXI.loader.add('G01d', "assets/G01d.png");




    // Enemies ------------------------------
    const EnemyType = [
        {
            ani: 1,
            h: 48,
            w: 48,
            speed: 3,
            tAni: 5,
            deathLine: 18,
            gH: 672,
            AI: 0
        },
        {
            ani: 1,
            h: 96,
            w: 48,
            speed: 0.5,
            tAni: 7,
            deathLine: 0,
            gH: 672 + 48 * 2,
            AI: 1
        },
        {
            ani: 1,
            h: 24,
            w: 48,
            speed: 5,
            tAni: 3,
            deathLine: 18,
            gH: 672 + 48 * 2 + 96 * 2,
            AI: 2
        },
        {
            ani: 1,
            h: 26,
            w: 48,
            speed: 5,
            tAni: 3,
            deathLine: 18,
            gH: 672 + 48 * 2 + 96 * 2 + 24 * 2,
            AI: 2
        },
    ];

    let enemies = [
        {
            enabled: true,
            enemyType: 0,
            ani: 0,
            aniT: 0,
            ax: -EnemyType[0].speed,
            ry: 0,
            rx: 48 + EnemyType[0].w * 0,
            direction: 0,
            shown: false,
            sprite: (function () {
                let s = new PIXI.Sprite(PIXI.loader.resources["G00"].texture);
                s.x = 48 * 12;
                s.y = 48 * 9 - EnemyType[0].h;
                return s;
            })()
        }
    ];
    stage.addChild(enemies[0].sprite);





        // Gegner bewegen
        enemies.forEach((enemy) => {
            if (!enemy.enabled) {
                return false;
            }
            let enemyType = EnemyType[enemy.enemyType];
            enemy.aniT++;

            if (enemy.aniT >= enemyType.tAni) {
                enemy.aniT = 0;
                enemy.ani++;
                if (enemy.ani > enemyType.ani) {
                    enemy.ani = 0;
                }
            }

            switch (enemyType.AI) {
                case 0:
                    if (checkLinksundRechts(enemy.sprite.x, enemy.sprite.y, enemy.ax, enemyType.w, 1)) {
                        enemy.ax = -enemy.ax;
                        enemy.direction = 1 - enemy.direction;
                    } else {
                        enemy.sprite.x += enemy.ax;
                    }
                    break;
            }

            enemy.sprite.texture = PIXI.loader.resources["G" + enemy.enemyType + enemy.ani + (enemy.direction ? "d" : "")].texture;
        });
       For k = 0 To MaxG
         With Gegner(k)
         If .Enabled Then
         .AniT = .AniT + 1
         If .AniT >= GegnerArt(.GegnerArt).TAni Then
         .AniT = 0
         .Ani = .Ani + 1
         If .Ani > GegnerArt(.GegnerArt).Ani Then .Ani = 0
         End If
         If GegnerArt(.GegnerArt).Intelligenz = 0 Then
         If CheckLinksundRechts(.x, .y, .SX, GegnerArt(.GegnerArt).W, 1) Then
         .SX = -.SX
         If .SX > 0 Then
         .Gedreht = (GegnerArt(.GegnerArt).Ani + 1) * GegnerArt(.GegnerArt).W
         Else
         .Gedreht = 0
         End If
         Else
         .x = .x + .SX
         End If
         ElseIf GegnerArt(.GegnerArt).Intelligenz = 1 Then
         t = t + 0.021
         k2 = Sin(t)
         .y = .y + k2
         .Boden = .Boden + k2
         If .x <= Held.x + 24 Then
         .Gedreht = (GegnerArt(.GegnerArt).Ani + 1) * GegnerArt(.GegnerArt).W
         Else
         .Gedreht = 0
         End If
         ElseIf GegnerArt(.GegnerArt).Intelligenz = 2 Then
         .x = .x + .SX
         If .SX < 0 Then
         If .x <= .GrenzeX1 Then
         .SX = -.SX
         .Gedreht = (GegnerArt(.GegnerArt).Ani + 1) * GegnerArt(.GegnerArt).W
         End If
         Else
         If .x >= .GrenzeX2 Then
         .SX = -.SX
         .Gedreht = 0
         End If
         End If
         End If
         End If
         End With
         Next





});
         */

