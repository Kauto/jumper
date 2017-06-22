import {
  Sprites as SP,
  Animations as ANI,
  Sequence,
  Easing
} from 'animationvideo';
import cutsceneBase from './cutsceneBase';

export default function (Audiomanager) {
  return cutsceneBase({
    images: {
      'jumping': 'assets/jumping.png',
      'dieing': 'assets/dieing.png'
    },
    animation: (scene, layer) => {
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
        SP.StarField({
          moveY: -26,
          moveZ: -0.5,
          a: 1,
          animation: Sequence(1, 0, [[
            ANI.Wait(1900),
            ANI.ChangeTo({
              moveY: 0
            }, 100),
            ANI.Wait()
          ]])
        })
      ];
      layer.unshift(l);
      l = [
        SP.Image({
          image: 'jumping',
          x: 400,
          y: -48,
          frameWidth: 48,
          frameX: 48 * 4,
          animation: Sequence(1, 0, [[
            ANI.Callback(() => Audiomanager.playSound('sfx', 'schall'), 0),
            ANI.ChangeTo({
              y: 350
            }, 600, Easing.quadOut),
            ANI.Wait(1400),
            ANI.Callback(() => Audiomanager.playSound('sfx', 'schlag'), 0),
            ANI.Image('dieing'),
            ANI.ImageFrame([0, 1, 2, 3, 4, 5, 6], true, 50),
            ANI.Wait()
          ]])
        })
      ];
      layer.unshift(l);
      l = [
        SP.Circle({
          x: 400,
          y: 360,
          scaleX: 100,
          scaleY: 25,
          color: '#222',
          alphaMode: 'lighter',
          a: 0,
          animation: Sequence(1, -2500, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Wait()
          ]])
        })
      ];
      layer.unshift(l);
      l = [
        SP.Emitter({
          'class': SP.Particle,
          x: 400,
          y: 360,
          scaleX: 20,
          scaleY: 20,
          alphaMode: 'source-over',
          count: 30,
          color: function () {
            return 'rgb(255,' + ~~(Math.random() * 64 + 32) + ',' + ~~(Math.random() * 16) + ')';
          },
          a: function (i) {
            return ((i % 2)) ? 0.8 : 0.5;
          },
          animation: function (i) {
            return new Sequence(true, -i * 1 - 2000, [[
              new ANI.ChangeTo({
                x: ANI.ChangeTo.createChangeByFunction(function () {
                  return Math.random() * 48 - 24;
                }),
                y: ANI.ChangeTo.createChangeByFunction(function () {
                  return Math.random() * 48 - 24;
                }),
                a: 0,
                scaleX: 10,
                scaleY: 10

              }, 300)
            ]]);
          }
        })
      ];
      layer.unshift(l);
      l = [
        SP.Scroller({
          text: 'GAME OVER',
          x: (i) => 230 + i * 40,
          y: 100,
          color: '#FFF',
          font: '32px Audiowide',
          a: 1,
          animation: (i) => Sequence(true, -2000 - i * 10, [[
            ANI.ChangeTo({
              color: '#F00',
            }, 100, Easing.quadInOut),
            ANI.ChangeTo({
              color: '#ff0fe9',
            }, 100, Easing.quadInOut),
            ANI.ChangeTo({
              color: '#2840ff',
            }, 100, Easing.quadInOut),
            ANI.ChangeTo({
              color: '#14ffeb',
            }, 100, Easing.quadInOut),
            ANI.ChangeTo({
              color: '#FFF',
            }, 100, Easing.quadInOut),
            ANI.Wait(1000)
          ]])
        }),
      ];
      layer.unshift(l);
      /*
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
       */
      return layer;
    }
  });
}