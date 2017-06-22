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
    music: 'assets/music/cut2',
    //addBindings: false,
    images: {
      'p1': 'assets/intro/p1.png',
      'p2': 'assets/intro/p2.png',
      'p3': 'assets/intro/p3.png',
      'p4': 'assets/intro/p4.png',
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
        SP.Group({
          sprite: [
            SP.Image({
              image: 'p1',
              animation: Sequence(1, 0, [[
                ANI.Wait(7000),
                ANI.ChangeTo({
                  a: 0
                }, 1500)
              ]])
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
              ], [
                ANI.Wait(7000),
                ANI.ChangeTo({
                  a: 0
                }, 1500),
                ANI.EndDisabled()
              ]])
            }),
            SP.Image({
              image: 'p3',
              a: 0,
              animation: Sequence(1, -7500, [[
                ANI.ChangeTo({
                  a: 1
                }, 1500),
                ANI.Wait()
              ]])
            }),
            SP.Image({
              image: 'p4',
              a: 0,
              animation: Sequence(true, -7500, [[
                ANI.ChangeTo({
                  x: () => Math.random() * 10 - 5,
                  y: () => Math.random() * 20 - 5,
                  arc: () => Math.random() * 30 - 15,
                }),
                ANI.Wait(100)
              ], [
                ANI.ChangeTo({
                  a: 1
                }, 1500),
                ANI.Wait()
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
                return Sequence(true, -2000 - i * 10, [[
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
                return Sequence(true, -10000 - i * 10, [[
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
          animation: Sequence(1, 0, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Callback(() => Audiomanager.playSound('sfx', 'e_laugh'), 0),
            ANI.Wait(5000),
            ANI.Shake(5, 250),
            ANI.Shake(10, 250),
            ANI.Shake(20, 3000),
            ANI.Shake(10, 250),
            ANI.Shake(5, 250),
            ANI.Callback(() => Audiomanager.playSound('sfx', 'e_laugh'), 0),
            ANI.Wait(5000),
            ANI.ChangeTo({
              a: 0
            }, 1000),
          ], [
            ANI.ChangeTo({
              x: 400,
              scaleX: 1.3,
              scaleY: 1.3
            }, 16000)
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
      textBox(Audiomanager, l, 'Denkst du das war alles?!', 450, 100, 240, 500);
      textBox(Audiomanager, l, 'Ich zeig dir meine finale Form!', 450, 200, 290, 4500);
      textBox(Audiomanager, l, 'Wir sind ein und dasselbe!', 450, 300, 240, 9500);
      layer.unshift(l);
      layer.unshift([(ctx, t) => (t >= 16300) && destroy()]);
      return layer;
    }
  });
}