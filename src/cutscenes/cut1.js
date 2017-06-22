import {
  Sprites as SP,
  Animations as ANI,
  Sequence,
  Easing
} from 'animationvideo';
import { textBox } from './effects/effects';
import cutsceneBase from './cutsceneBase';

export default function (Audiomanager) {
  return cutsceneBase({
    music: 'assets/music/cut2',
    //addBindings: false,
    images: {
      'f5': 'assets/intro/f5.jpg',
      't3': 'assets/intro/t3.jpg',
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
          image: 'f5',
          x: 300,
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
              x: 250,
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
      textBox(Audiomanager, l, 'Steffi ist hier nicht! Los mach Buttons!', 25, 50, 350, 500);
      textBox(Audiomanager, l, 'Niemals mehr Slave!', 50, 250, 200, 8500);
      layer.unshift(l);
      layer.unshift([(ctx, t) => (t >= 16300) && destroy()]);
      return layer;
    }
  });
}