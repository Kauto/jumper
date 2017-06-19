import {
  Sprites,
  Sequence,
  Animations,
  Easing
} from 'animationvideo';

export function explosion (x, y, timeshift, size = 48) {
  return new Sprites.Emitter({
    'class': Sprites.Particle,
    x: x,
    y: y,
    scaleX: size,
    scaleY: size,
    alphaMode: function (i) {
      return ((i % 2)) ? 'lighter' : 'source-over';
    },
    count: 30,
    color: function () {
      return 'rgb(' + ~~(Math.random() * 128 + 127) + ',' + ~~(Math.random() * 64 + 32) + ',' + ~~(Math.random() * 16) + ')';
    },
    a: function (i) {
      return ((i % 2)) ? 0.8 : 0.5;
    },
    animation: function (i) {
      return new Sequence(true, -i * 1 - timeshift, [[
        new Animations.ChangeTo({
          x: Animations.ChangeTo.createChangeByFunction(function () {
            return Math.random() * size - size / 2;
          }),
          y: Animations.ChangeTo.createChangeByFunction(function () {
            return Math.random() * size - size / 2;
          })
        }, 300),
        new Animations.ChangeTo({
          x: Animations.ChangeTo.createChangeByFunction(function () {
            return Math.random() * size * 2 - size;
          }),
          y: Animations.ChangeTo.createChangeByFunction(function () {
            return Math.random() * size * 2 - size;
          }),
          a: 0,
          scaleX: 10,
          scaleY: 10
        }, 300),
        new Animations.WaitDisabled(2000),
        new Animations.ChangeTo({
          x: Animations.ChangeTo.createChangeToFunction(function () {
            return x;
          }),
          y: Animations.ChangeTo.createChangeToFunction(function () {
            return y;
          }),
          a: ((i % 2)) ? 0.8 : 0.5,
          scaleX: size,
          scaleY: size
        }),
      ]]);
    }
  });
};