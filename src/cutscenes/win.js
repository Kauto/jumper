import {
  Sprites as SP,
  Animations as ANI,
  Sequence,
  Easing
} from 'animationvideo';
import Color from 'color';
import cutsceneBase from './cutsceneBase';

export default function (Audiomanager, levelNumber) {
  return cutsceneBase('assets/music/fanfare', {
    'walking': 'assets/walking.png'
  }, (scene, layer, destroy) => {
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
        moveX: -12,
      })
    ];
    layer.unshift(l);
    l = [
      SP.Emitter({
        class: SP.Rect,
        x: 0,
        y: 240,
        width: 800,
        height: 0,
        count: 10,
        color: (i) => Color('#00F').mix(Color('#F00'), i / 9).string(),
        animation: (i) => Sequence(1, -500 - 100 * i, [[
          ANI.ChangeTo({
            y: 190,
            height: 100
          }, 300, Easing.quadOut),
          ANI.Wait(i === 9 ? null : 1000)
        ]])
      })
    ];
    layer.unshift(l);
    l = [
      SP.Image({
        image: 'walking',
        x: -50,
        y: 240,
        a: 1,
        frameWidth: 48,
        animation: Sequence(true, -2000, [[
          ANI.ImageFrame([0, 1, 2, 3, 4, 5, 6], true, 50)
        ], [
          ANI.ChangeTo({
            x: 850
          }, 3000),
          ANI.EndDisabled()
        ]])
      }),
    ];
    layer.unshift(l);
    l = [
      SP.Text({
        text: 'LEVEL ' + (levelNumber + 1),
        x: 400,
        y: 100,
        color: '#FFF',
        font: '32px Audiowide',
        animation: Sequence(1, -3500, [[
          ANI.Wait()
        ]])
      }),
      SP.Text({
        text: 'LEVEL ' + levelNumber,
        x: 400,
        y: 100,
        color: '#FFF',
        font: '32px Audiowide',
        animation: Sequence(1, 0, [[
          ANI.Wait(3500)
        ]])
      }),
    ];
    layer.unshift(l);
    l = [
      new SP.FastBlur({
        alphaMode: 'lighter',
        x: 250,
        width: 300,
        y: 50,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        a: 0,
        animation: Sequence(1, -3000, [[
          ANI.ChangeTo({
            a: 1,
            scaleX: 50,
            scaleY: 50,
          }, 500),
          ANI.Callback(() => Audiomanager.playSound('sfx', 'whip'), 0),
          ANI.ChangeTo({
            a: 0,
            scaleX: 1,
            scaleY: 1
          }, 500),
        ]])
      })

    ];
    layer.unshift(l);

    return layer;
  });
}