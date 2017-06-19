import {
  Sprites as SP,
  Animations as ANI,
  Sequence,
  Easing
} from 'animationvideo';
import Color from 'color';
import { textBox } from './effects/effects';
import cutsceneBase from './cutsceneBase';

export default function (Audiomanager) {
  return cutsceneBase('assets/music/outro', {
    's1': 'assets/intro/s1.jpg',
    't3': 'assets/intro/t3.jpg',
    'st1': 'assets/intro/st1.jpg',
    'walking': 'assets/walking.png'
  }, (scene, layer) => {
    let l;
    l = [
      SP.Rect({
        color: '#fff',
        animation: Sequence(1, 0, [[
          ANI.ChangeTo({
            color: '#000'
          }, 1000, Easing.quadInOut),
          ANI.Wait()
        ]])
      })
    ];
    layer.unshift(l);
    l = [
      SP.Image({
        image: 's1',
        x: 350,
        y: 240,
        scaleX: 2,
        scaleY: 2,
        a: 0,
        animation: Sequence(1, -500, [[
          ANI.ChangeTo({
            a: 1
          }, 1000),
          ANI.Wait(6000),
          ANI.ChangeTo({
            a: 0
          }, 1000)
        ], [
          ANI.ChangeTo({
            x: 400,
            scaleX: 1.8,
            scaleY: 1.8
          }, 8000)
        ]])
      }),
      SP.Group({
        sprite: [
          SP.Image({
            image: 't3',
            x: 450,
            y: 390,
            scaleX: 1.5,
            scaleY: 1.5
          }),
          SP.Emitter({
            class: SP.Particle,
            alphaMode: 'lighter',
            x: (i) => i % 2 ? 545 : 450,
            y: (i) => 255,
            color: '#00F',
            scaleX: 20,
            scaleY: 20,
            a: 1,
            count: 1200,
            animation: (i) => Sequence(1, -1000 - i * 5, [[
              new ANI.ChangeTo({
                x: ANI.ChangeTo.createChangeByFunction(function () {
                  return Math.random() * 50 + 200;
                }),
                y: ANI.ChangeTo.createChangeByFunction(function () {
                  return Math.random() * 20;
                }),
                a: 0
              }, 1000, Easing.expoOut),
            ]])
          })

        ],
        x: 0,
        a: 0,
        animation: Sequence(1, -8500, [[
          ANI.ChangeTo({
            a: 1
          }, 1000),
          ANI.Callback(() => Audiomanager.playSound('sfx', 'electric'), 0),
          ANI.Wait(6000),
          ANI.ChangeTo({
            a: 0
          }, 1000)
        ], [
          ANI.ChangeTo({
            x: -100,
            scaleX: 1.1,
            scaleY: 1.1
          }, 8000)
        ]])

      }),
      SP.FastBlur({
        x: 200,
        y: 200,
        width: 200,
        height: 50,
        pixel: true,
        scaleX: 1,
        scaleY: 1,
        animation: Sequence(1, -16500, [[
          ANI.Callback(() => Audiomanager.playSound('sfx', 'gestoehn'), 0),
          ANI.ChangeTo({
            scaleX: 10,
            scaleY: 10
          }, 1000),
          ANI.Wait(7000)
        ]])
      }),
      SP.Image({
        image: 'st1',
        x: 450,
        y: 240,
        scaleX: 1.1,
        scaleY: 1.1,
        a: 0,
        animation: Sequence(1, -16500, [[
          ANI.ChangeTo({
            a: 1
          }, 1000),
          ANI.Wait(6000),
          ANI.ChangeTo({
            a: 0
          }, 1000)
        ], [
          ANI.ChangeTo({
            x: 400,
            scaleX: 1.0,
            scaleY: 1.0
          }, 8000)
        ]])
      })
    ];
    layer.unshift(l);
    l = [
      new SP.Text({
        text: '\u2764',
        x: 120,
        y: 105,
        font: '64px Arial',
        color: '#F00',
        a: 0,
        scaleX: 0,
        scaleY: 0,
        animation: Sequence(1, -1500, [[
          ANI.ChangeTo({
            a: 1,
            scaleX: 1,
            scaleY: 1
          }, 500, Easing.quadInOut),
          ANI.ChangeTo({
            a: 0,
            scaleX: 0,
            scaleY: 0
          }, 500, Easing.quadInOut)
        ]])
      }),
      new SP.Text({
        text: '\u2764',
        x: 310,
        y: 85,
        font: '64px Arial',
        color: '#F00',
        a: 0,
        scaleX: 0,
        scaleY: 0,
        animation: Sequence(1, -1500, [[
          ANI.ChangeTo({
            a: 1,
            scaleX: 1,
            scaleY: 1
          }, 500, Easing.quadInOut),
          ANI.ChangeTo({
            a: 0,
            scaleX: 0,
            scaleY: 0
          }, 500, Easing.quadInOut)
        ]])
      })
    ];
    layer.unshift(l);
    l = [
      new SP.FastBlur({
        alphaMode: 'lighter',
        scaleX: 20,
        scaleY: 20,
        a: 0.4,
        pixelated: true,
        animation: Sequence(true, 0, [[
          ANI.ChangeTo({
            a: 0.1
          }, 5000),
          ANI.ChangeTo({
            a: 0.4
          }, 5000),
        ]])
      })

    ];
    layer.unshift(l);
    l = [
      new SP.FastBlur({
        scaleX: 40,
        scaleY: 40,
        a: 1,
        pixel: true,
        animation: Sequence(1, -24500, [[
          ANI.Wait(8000)
        ]])
      }),
      SP.Emitter({
        'class': SP.Particle,
        x: function (i) {
          return Math.random() * 800;
        },
        y: function (i) {
          return Math.random() * 400;
        },
        scaleX: 300,
        scaleY: 300,
        alphaMode: function (i) {
          return (i % 2) ? 'lighter' : 'source-over';
        },
        count: 100,
        color: (i) => Color('#b78d6f').mix(Color('#FFF0E5'), Math.random()).string(),
        animation: function (i) {
          return Sequence(true, -24500 - i, [[
            () => i % 2 ? null : ANI.ChangeTo({
              x: Math.random() * scene.w,
              y: Math.random() * scene.h
            }, 300, Easing.linear)
          ], [
            ANI.Callback(() => Audiomanager.playSound('sfx', 'gestoehn2'), 0),
            ANI.ChangeTo({
              a: 1
            }, 500),
            ANI.Wait(7000),
            ANI.ChangeTo({
              a: 0
            }, 500),
            ANI.EndDisabled()

          ]]);
        }
      })
    ];
    layer.unshift(l);
    l = [
      SP.Emitter({
        'class': SP.Particle,
        x: function (i) {
          return (250 + Math.random() * 300);
        },
        y: function (i) {
          return (50 + Math.random() * 10);
        },
        scaleX: 12,
        scaleY: 12,
        alphaMode: 'lighter',
        count: 1000,
        color: function () {
          return '#FFB';
        },
        a: 0,
        animation: function (i) {
          return Sequence(1, -33000 - i * 50, [[
            ANI.ChangeTo({
              y: ANI.ChangeTo.createChangeByFunction(function () {
                return Math.random() * 50 + 350;
              }),
              a: [1, 1, 1, 0]
            }, 800, Easing.quadIn)
          ]]);
        }
      }),
      SP.Text({
        text: 'Happy Ending',
        x: 400,
        y: 100,
        color: '#FFF',
        font: '32px Audiowide',
        a: 0,
        animation: Sequence(1, -33000, [[
          ANI.ChangeTo({
            a: 1
          }, 300, Easing.quadOut),
          ANI.Wait()
        ]])
      }),
      SP.Text({
        text: '\u2764',
        x: 400,
        y: 180,
        a: 0,
        font: '100px Arial',
        scaleX: 0.9,
        scaleY: 0.9,
        color: '#F00',
        animation: Sequence(true, -33000, [[
          ANI.ChangeTo({
            a: 1,
          }, 3000, Easing.quadOut),
          ANI.Wait()
        ], [
          ANI.ChangeTo({
            scaleX: 1,
            scaleY: 1,
          }, 400, Easing.quadInOut),
          ANI.ChangeTo({
            scaleX: 0.9,
            scaleY: 0.9,
          }, 400, Easing.quadInOut),
          ANI.Wait(400)
        ]])
      })
    ];
    layer.unshift(l);
    l = [];
    textBox(Audiomanager, l, 'Oh Tobi! Du hast mich gerettet!', 500, 50, 290, 1000);
    textBox(Audiomanager, l, 'Natürlich! Wer sonst?', 80, 80, 210, 9000);
    textBox(Audiomanager, l, 'Oh Tobi!', 600, 60, 110, 17000);
    textBox(Audiomanager, l, 'Oh ja! Oh ja! Oh ja!', 500, 380, 210, 25000);
    layer.unshift(l);
    return layer;
  }, false);
}