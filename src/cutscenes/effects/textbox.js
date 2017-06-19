import {
  Sprites,
  Sequence,
  Animations,
  Easing
} from 'animationvideo';


export function textBox (Audiomanager, l, text, x, y, width, timeShift) {
  l.push(
    Sprites.Scroller({
      text: text,
      x: (i) => x + 25 + i * 8,
      y: y + 25,
      color: '#F00',
      font: '14px Monospace',
      a: 0,
      animation: (i) => Sequence(1, -timeShift - 500 - i * 10, [[
        Animations.Callback(() => Audiomanager.playSound('sfx', 'ding'), 0),
        Animations.ChangeTo({
          a: 1,
          color: '#000'
        }, 300),
        Animations.Wait(3000),
        Animations.ChangeTo({
          a: 0
        }, 300),
      ]])
    })
  );
  l.push(
    Sprites.Rect({
      x: x,
      y: y,
      width: 0,
      height: 0,
      color: '#FFF',
      borderColor: '#000',
      animation: Sequence(1, -timeShift, [[
        Animations.ChangeTo({
          width: width,
          height: 50
        }, 300, Easing.bounceOut),
        Animations.Wait(4000),
        Animations.ChangeTo({
          width: 0,
          height: 0
        }, 300, Easing.bounceIn)
      ]])
    })
  );
}