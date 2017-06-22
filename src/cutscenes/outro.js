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
  return cutsceneBase({
    music: 'assets/music/outro',
    addBindings: false,
    images: {
      's1': 'assets/intro/s1.jpg',
      't2': 'assets/intro/t2.jpg',
      't3': 'assets/intro/t3.jpg',
      'f1': 'assets/intro/f1.jpg',
      'f2': 'assets/intro/f2.jpg',
      'f3': 'assets/intro/f3.jpg',
      'st1': 'assets/intro/st1.jpg',
      'walking': 'assets/walking.png'
    }, animation: (scene, layer) => {
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
        SP.Image({
          image: 'f1',
          x: 800,
          y: 120,
          scaleX: 0.8,
          scaleY: 0.8,
          a: 0,
          animation: Sequence(1, -16500, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Wait(4500),
            ANI.ChangeTo({
              a: 0
            }, 1000)
          ], [
            ANI.ChangeTo({
              x: 400,
              scaleX: 0.9,
              scaleY: 0.9
            }, 6500)
          ]])
        }),
        SP.Image({
          image: 'f2',
          x: 0,
          y: 360,
          scaleX: 1,
          scaleY: 1,
          a: 0,
          animation: Sequence(1, -16500, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Wait(5000),
            ANI.ChangeTo({
              a: 0
            }, 1000)
          ], [
            ANI.ChangeTo({
              x: 400,
              scaleX: 0.9,
              scaleY: 0.9
            }, 7000)
          ]])
        }),
        SP.Image({
          image: 'f3',
          x: 800,
          y: 240,
          scaleX: 0.2,
          scaleY: 0.2,
          a: 0,
          animation: Sequence(1, -16500, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Wait(12000),
            ANI.ChangeTo({
              a: 0
            }, 1000)
          ], [
            ANI.ChangeTo({
              x: 400,
              scaleX: 0.25,
              scaleY: 0.25
            }, 7000, Easing.quadOut),
            ANI.Wait(300),
            ANI.ChangeTo({
              x: 3800,
              y: -3000,
              scaleX: 3,
              scaleY: 3
            }, 2000, Easing.quadInOut),
          ]])
        }),
        SP.Image({
          image: 't2',
          x: 350,
          y: 240,
          scaleX: 2,
          scaleY: 2,
          a: 0,
          animation: Sequence(1, -28500, [[
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
        SP.FastBlur({
          x: 400,
          y: 200,
          width: 150,
          height: 80,
          pixel: true,
          scaleX: 1,
          scaleY: 1,
          animation: Sequence(1, -36500, [[
            ANI.Callback(() => Audiomanager.playSound('sfx', 'gestoehn'), 0),
            ANI.ChangeTo({
              scaleX: 15,
              scaleY: 15
            }, 1000),
            ANI.Wait(7000)
          ]])
        }),
        SP.Image({
          image: 'st1',
          x: 400,
          y: 290,
          scaleX: 0.9,
          scaleY: 0.9,
          a: 0,
          animation: Sequence(1, -36500, [[
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
              scaleX: 0.8,
              scaleY: 0.8
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
          animation: Sequence(1, -44500, [[
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
            return Sequence(true, -44500 - i, [[
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
            return Sequence(1, -53000 - i * 50, [[
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
          text: 'The Happy End',
          x: 400,
          y: 100,
          color: '#FFF',
          font: '32px Audiowide',
          a: 0,
          animation: Sequence(1, -53000, [[
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
          scaleY: 1.2,
          color: '#F00',
          animation: Sequence(true, -53000, [[
            ANI.ChangeTo({
              a: 1,
            }, 3000, Easing.quadOut),
            ANI.Wait()
          ], [
            ANI.ChangeTo({
              scaleX: 1,
              scaleY: 1.3,
            }, 400, Easing.quadInOut),
            ANI.ChangeTo({
              scaleX: 0.9,
              scaleY: 1.2,
            }, 400, Easing.quadInOut),
            ANI.Wait(400)
          ]])
        })
      ];
      layer.unshift(l);
      l = [];
      textBox(Audiomanager, l, 'Oh Tobi! Du hast mich gerettet!', 500, 50, 290, 1000);
      textBox(Audiomanager, l, 'Natürlich! Wer sonst?', 80, 80, 210, 9000);
      textBox(Audiomanager, l, 'Alles TROTZ unserer "Freunde"!', 260, 260, 280, 17000);
      textBox(Audiomanager, l, '(Lasst mich hier raus!)', 50, 60, 230, 25000);
      textBox(Audiomanager, l, 'Komm her Bitch!', 550, 60, 170, 30000);
      textBox(Audiomanager, l, 'Oh Tobi!', 600, 60, 110, 37000);
      textBox(Audiomanager, l, 'Oh ja! Oh ja! Oh ja!', 500, 380, 210, 45000);
      layer.unshift(l);
      return layer;
    }
  });
}