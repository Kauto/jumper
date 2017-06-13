require('pixi.js');

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;

            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;

            event.preventDefault();
        }
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}


let level = [];
//                    1         2         3         4         5         6         7         8         9         10        11        12        13        14        15        16        17
//          012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
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

let levelData = [];
for (let k = 0; k < level.length; k++) {
    levelData[k] = [];
    for (let k2 = 0; k2 < level[k].length; k2++) {
        let asc = level[k].charCodeAt(k2);
        if (asc < 97) {
            levelData[k][k2] = asc - 48;
        } else {
            levelData[k][k2] = asc - 87;
        }
    }
}
for (let i = 0; i <= 11; i++) {
    PIXI.loader.add('j' + i, "assets/j" + i + ".png");
}
for (let i = 1; i <= 4; i++) {
    PIXI.loader.add('H' + i, "assets/h" + i + ".png");
}
PIXI.loader.add('G00', "assets/G00.png");
PIXI.loader.add('G00d', "assets/G00d.png");
PIXI.loader.add('G01', "assets/G01.png");
PIXI.loader.add('G01d', "assets/G01d.png");

PIXI.loader.on("progress", function (loader) {
    let element = document.getElementById('progress');
    if (element) {
        element.style.display = 'block';
        element.value = Math.round(loader.progress);
        element.innerHTML = Math.round(loader.progress) + '%';
    }
}).load(function () {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
// The stage to play your game.
    var renderer = renderer = PIXI.autoDetectRenderer(700, 480);
    document.getElementById('main').appendChild(renderer.view);

    renderer.autoResize = true;

//Create a container object called the `stage`
    var all = new PIXI.Container();


    all.addChild(new PIXI.Sprite(
        PIXI.loader.resources["j0"].texture
    ));

    var stage = new PIXI.Container();

    all.addChild(stage);

    for (let y = 0; y < levelData.length; y++) {
        for (let x = 0; x < levelData[y].length; x++) {
            if (levelData[y][x]) {
                let sprite = new PIXI.Sprite(
                    PIXI.loader.resources["j" + levelData[y][x]].texture
                );
                sprite.x = x * 48;
                sprite.y = y * 48;
                stage.addChild(sprite);
            }
        }
    }

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


// Hero ------------------
    let hero = {
        dead: 0,
        ax: 0,
        ay: 0,
        sprite: new PIXI.Sprite(
            PIXI.loader.resources["H1"].texture
        )
    };
    hero.sprite.x = 0;
    hero.sprite.y = -100;
    stage.addChild(hero.sprite);


    function checkLinksundRechts(x, y, ax, width, hightSteps) {
        if ((x + ax) < 0 || (x + ax) > levelData[0].length * 48) {
            return true;
        }
        if (ax > 0) {
            if ((y > -95) && hightSteps > 2 && levelData[Math.floor((y + 95) / 48)][Math.floor((x + ax + width) / 48)] > 9) return true;
            if (y > -47 && hightSteps > 1 && levelData[Math.floor((y + 47) / 48)][Math.floor((x + ax + width) / 48)] > 9) return true;
            if (y > 0 && levelData[Math.floor(y / 48)][Math.floor((x + ax + width) / 48)] > 9) return true;
        } else {
            if ((y > -95) && hightSteps > 2 && levelData[Math.floor((y + 95) / 48)][Math.floor((x + ax ) / 48)] > 9) return true;
            if (y > -47 && hightSteps > 1 && levelData[Math.floor((y + 47) / 48)][Math.floor((x + ax ) / 48)] > 9) return true;
            if (y > 0 && levelData[Math.floor(y / 48)][Math.floor((x + ax ) / 48)] > 9) return true;
        }
        return false;
    }


    const G = 0.5;
    const FH = 48 * levelData.length;
    let SprungOK = 0;
    let SprungT = 0;
    const keyLeft = keyboard(37);
    const keyRight = keyboard(39);
    const keyDown = keyboard(40);
    const keyJump = keyboard(32);
    let jumpKey = false;

    function mainloop() {
        requestAnimationFrame(mainloop.bind(this));

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
        /*  For k = 0 To MaxG
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
         */


        // Held bewegen
        hero.ay += G;
        hero.sprite.y += hero.ay;
        hero.sprite.texture = PIXI.loader.resources["H" + (keyDown.isDown ? "2" : "1")].texture;

        // runterfallen
        if (!hero.dead) {
            if (hero.sprite.y >= FH - 96) {
                hero.sprite.y = FH - 96;
                hero.ay = -22;
                hero.dead = 1;
            }

            //Gegner check
            enemies.forEach((enemy) => {
                    if (!enemy.enabled) {
                        return false;
                    }
                    let enemyType = EnemyType[enemy.enemyType];

                    if (hero.sprite.x + 48 > enemy.sprite.x && hero.sprite.x < enemy.sprite.x + enemyType.w) {
                        if (hero.sprite.y + 96 > enemy.sprite.y + enemyType.deathLine && hero.sprite.y < enemy.sprite.y + enemyType.h) {
                            hero.ay = -5;
                            hero.dead = 1;
                        }
                        else if (hero.sprite.y + 96 <= enemy.sprite.y + enemyType.deathLine && hero.sprite.y + 96 >= enemy.sprite.y) {
                            //BeginPlaySound Games & "drip.wav"
                            enemy.enabled = false;
                            hero.ay = -Math.abs(hero.ay) / 2;
                            SprungOK = 1;
                            SprungT = 5;
                            enemy.sprite.visible = false;
                        }
                    }
                }
            );
        }

        if (hero.dead > 0) {
//TOD
            if (hero.dead === 1) {
                //BeginPlaySound Games & "e_laugh.wav"
                hero.dead = hero.dead + 1;
            }
            if (hero.sprite.y > FH) {
                hero.sprite.y = FH + 1;
                hero.dead = hero.dead + 1;
            } else {
                //hero.sprite.rotation += 0.1;
                //Addpartikel 1, hero.sprite.x + 20 - LevelX, hero.sprite.y, hero.sprite.x + 28 - LevelX, hero.sprite.y + 48, True
            }
            if (hero.dead === 55) {
                alert('dead');
            }
        } else {
            /*    if (GewonnenT = 0 ) {
             'simple Animation
             if (Keys(vbKeyDown) > 126 Or hero.AY < -1.5 ) {
             hero.Ani = 1
             } else {
             hero.Ani = 0
             }
             }*/

            //check Decke
            if (hero.sprite.y > 0) {
                let ld = levelData[Math.floor(hero.sprite.y / 48)][Math.floor(hero.sprite.x / 48)];
                let hitCeiling = 0;
                if (ld > 9) {
                    hitCeiling = 1;
                }
                if (hitCeiling === 0 && hero.sprite.x % 48 > 0) {
                    ld = levelData[Math.floor(hero.sprite.y / 48)][Math.floor(hero.sprite.x / 48) + 1];
                    if (ld > 9) {
                        hitCeiling = 1;
                    }
                }
                if (hitCeiling === 1) {
                    hero.sprite.y = Math.round(hero.sprite.y / 48) * 48 + 1;
                    hero.ay = 0;
                }
            }

            //check Boden
            if (hero.sprite.y >= -96) {
                k2 = levelData[Math.floor((hero.sprite.y + 96) / 48)][Math.floor(hero.sprite.x / 48)];
                k = 0;
                if (k2 > 9) {
                    k = 1;
                }
                if (k === 0 && hero.sprite.x % 48 > 0) {
                    k2 = levelData[Math.floor((hero.sprite.y + 96) / 48)][Math.floor(hero.sprite.x / 48) + 1];
                    if (k2 > 9) {
                        k = 1;
                    }
                }
                if (k === 1) {
                    hero.sprite.y = (Math.floor((hero.sprite.y + 96) / 48) - 2) * 48;
                    hero.ay = -hero.ay / 6;
                    SprungOK = 1;
                    SprungT = 5;
                } else {
                    if (SprungT === 0) {
                        SprungOK = 0;
                    } else {
                        SprungT = SprungT - 1;
                    }
                }
            }


            //bewegen
            if (SprungOK) {
                hero.ax = 0;
            } else {
                if (hero.ax < -0.2) {
                    hero.ax = hero.ax + 0.2;
                } else {
                    if (hero.ax > 0.2) {
                        hero.ax = hero.ax - 0.2
                    } else {
                        hero.ax = 0;
                    }
                }
            }
            if (true /*GewonnenT = 0*/) {
                if (keyRight.isDown) {
                    if (SprungOK) {
                        hero.ax = 3;
                    } else {
                        hero.ax = hero.ax + 0.25;
                    }
                }
                if (keyLeft.isDown) {
                    if (SprungOK) {
                        hero.ax = -3
                    } else {
                        hero.ax = hero.ax - 0.25;
                    }
                }
                /*      if (Keys(vbKeyEscape) > 126 ) {
                 hero.AY = -12
                 hero.dead = 1
                 'Talk = False
                 'E = 1
                 */
            }


            //springen
            if (keyJump.isDown && SprungOK > 0 && jumpKey === false) {
                //BeginPlaySound Games & "boing.wav"
                jumpKey = true;
                hero.ay = -11;
                SprungOK = SprungOK - 1;
                //Addpartikel 15, hero.sprite.x - LevelX, hero.sprite.y + 96, hero.sprite.x + 48 - LevelX, hero.sprite.y + 96, False
            } else {
                if (keyJump.isUp) jumpKey = false;
            }

            //check links und rechts
            if (checkLinksundRechts(hero.sprite.x, hero.sprite.y, hero.ax, 48, 3)) {
                hero.sprite.x = Math.round(hero.sprite.x / 48) * 48;
                hero.ax = 0;
            } else {
                hero.sprite.x = hero.sprite.x + hero.ax;
            }

            // scrollen
            if (hero.sprite.x + stage.x > 300) {
                stage.x = Math.min(300 - hero.sprite.x, 0);
            }
            if (hero.sprite.x + stage.x < 150) {
                stage.x = Math.min(150 - hero.sprite.x, 0);
            }


        }


        renderer.render(all);
    }

    requestAnimationFrame(mainloop.bind(this));


});

