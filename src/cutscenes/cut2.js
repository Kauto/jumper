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
    music: 'assets/music/cut',
    addBindings: false,
    images: {
      'f4': 'assets/intro/f4.jpg',
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
          image: 'f4',
          x: 400,
          y: 300,
          scaleX: 1,
          scaleY: 1,
          a: 0,
          animation: Sequence(1, -0, [[
            ANI.ChangeTo({
              a: 1
            }, 1000),
            ANI.Wait(8000),
            ANI.ChangeTo({
              a: 0
            }, 1000)
          ], [
            ANI.ChangeTo({
              y: 200,
              scaleX: 1.1,
              scaleY: 1.1
            }, 10000)
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
      textBox(Audiomanager, l, 'In der Tat! Habe Steffi auf dem Konzert gesehen!', 25, 25, 430, 500);
      textBox(Audiomanager, l, '(Ich hasse!)', 50, 250, 150, 2000);
      textBox(Audiomanager, l, '(Ich liebe aber auch!)', 550, 270, 230, 4000);
      layer.unshift(l);
      layer.unshift([(ctx, t) => (t >= 10100) && destroy()]);
      return layer;
    }
  });
}