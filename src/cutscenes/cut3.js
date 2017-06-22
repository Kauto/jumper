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
    music: 'assets/music/cut3',
    addBindings: false,
    images: {
      'f6': 'assets/intro/f6.jpg',
      't3': 'assets/intro/t3.jpg',
      'p1': 'assets/intro/p1.png',
      'p2': 'assets/intro/p2.png',
    },
    animation: (scene, layer, destroy) => {
      let l;
      l = [
        SP.Rect({
          color: '#fff',
          animation: Sequence(1, 0, [[
            ANI.ChangeTo({
              color: '#000'
            }, 100, Easing.quadInOut),
            ANI.Wait()
          ]])
        })
      ];
      layer.unshift(l);
      l = [
        SP.Image({
          image: 'f6',
          x: 375,
          y: 260,
          scaleX: 1,
          scaleY: 1,
          a: 0,
          animation: Sequence(1, -0, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Wait(6000),
            ANI.ChangeTo({
              a: 0
            }, 1000)
          ], [
            ANI.ChangeTo({
              x: 425,
              scaleX: 1.1,
              scaleY: 1.1
            }, 8000)
          ]])
        }),
        SP.Image({
          image: 't3',
          x: 350,
          y: 390,
          scaleX: 1.2,
          scaleY: 1.2,
          a: 0,
          animation: Sequence(1, -8000, [[
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
              scaleX: 1.3,
              scaleY: 1.3
            }, 8000)
          ]])
        }),

        SP.Group({
          sprite: [
            SP.Image({
              image: 'p1',
            }),
            SP.Image({
              image: 'p2',
              animation: Sequence(true, 0, [[
                ANI.ChangeTo({
                  x: () => Math.random() * 10 - 5,
                  y: () => Math.random() * 20 - 5,
                  arc: () => Math.random() * 30 - 15,
                }),
                ANI.Wait(100)
              ]])
            }),
                  SP.Emitter({
              'class': SP.Particle,
              x: (i) => i % 2 ? -65 : -135,
              y: (i) => -70,
              scaleX: 16,
              scaleY: 16,
              alphaMode: function (i) {
                return (i % 2) ? 'lighter' : 'source-over';
              },
              count: 100,
              color: (i) => Color('#FF0000').mix(Color('#ffeb13'), Math.random()).string(),
              a: 1,
              animation: function (i) {
                return Sequence(true,  -2000 - i * 10, [[
                  ANI.ChangeTo({
                    x: ANI.ChangeTo.createChangeByFunction(function () {
                      return Math.random() * 30 - 15;
                    }),
                    y: ANI.ChangeTo.createChangeByFunction(function () {
                      return Math.random() * 30 - 15;
                    }),
                    a: 0
                  }, 1000, Easing.expoOut)
                ]]);
              }
            }),
          ],
          x: 350,
          y: 390,
          scaleX: 1.2,
          scaleY: 1.2,
          a: 0,
          animation: Sequence(1, -16000, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Callback(() => Audiomanager.playSound('sfx', 'e_laugh'), 0),
            ANI.Wait(6000),
            ANI.ChangeTo({
              a: 0
            }, 1000)
          ], [
            ANI.ChangeTo({
              x: 400,
              scaleX: 1.3,
              scaleY: 1.3
            }, 8000)
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
      l = [];
      textBox(Audiomanager, l, 'Da ist sie doch!', 625, 250, 170, 500);
      textBox(Audiomanager, l, 'Andreas hat sie gefangen!', 300, 50, 250, 1000);
      textBox(Audiomanager, l, 'Da ist sie doch!', 25, 50, 170, 2000);
      textBox(Audiomanager, l, 'Entlass mich nicht!', 25, 250, 200, 1500);
      textBox(Audiomanager, l, 'Geht mir aus dem Weg Minions!', 50, 50, 280, 8500);
      textBox(Audiomanager, l, 'Du musst erst an mir vorbei!', 450, 100, 280, 16500);
      layer.unshift(l);
      layer.unshift([(ctx, t) => (t >= 24400) && destroy()]);
      return layer;
    }
  });
}