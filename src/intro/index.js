import {
  ImageManager,
  Engine,
  Scenes,
  Sprites,
  Sequence,
  Animations,
  Easing
} from 'animationvideo';
const _once = require('lodash/once');

function Intro (Audiomanager) {
  function explosion (x, y, timeshift) {
    return new Sprites.Emitter({
      'class': Sprites.Particle,
      x: x,
      y: y,
      scaleX: 48,
      scaleY: 48,
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
              return Math.random() * 50 - 25;
            }),
            y: Animations.ChangeTo.createChangeByFunction(function () {
              return Math.random() * 50 - 25;
            })
          }, 300),
          new Animations.ChangeTo({
            x: Animations.ChangeTo.createChangeByFunction(function () {
              return Math.random() * 100 - 50;
            }),
            y: Animations.ChangeTo.createChangeByFunction(function () {
              return Math.random() * 100 - 50;
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
            scaleX: 48,
            scaleY: 48
          }),
        ]]);
      }
    });
  }

  function textBox (l, text, x, y, width, timeShift) {
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

  return new Promise((resolve, reject) => {
    //resolve();

    let canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 480;
    document.getElementById('main').appendChild(canvas);

    let audio = document.createElement('audio');
    audio.src = 'assets/music/intro.mp3';
    audio.preload = 'auto';
    audio.load();

    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';

    let scene = Scenes.Audio(audio),
      engine = Engine(canvas, scene),
      SP = Sprites,
      ANI = Animations;

    scene.init({
      's1': 'assets/intro/s1.jpg',
      's2': 'assets/intro/s2.jpg',
      't1': 'assets/intro/t1.jpg',
      'st1': 'assets/intro/st1.jpg',
      'walking': 'assets/walking.png'
    }).loading(() => {

      return true;
    }).scene((scene, layer) => {

      let l;
      l = [
        SP.Rect({
          color: '#fff',
          animation: Sequence(1, 0, [[
            ANI.ChangeTo({
              color: '#000'
            }, 1000, Easing.quadInOut),
            ANI.Wait(40000),
            ANI.ChangeTo({
              color: '#FFF'
            }, 100, Easing.quadInOut),
            ANI.ChangeTo({
              color: '#000'
            }, 100, Easing.quadInOut),
            ANI.Wait(2000),
            ANI.ChangeTo({
              color: '#FFF'
            }, 100, Easing.quadInOut),
            ANI.ChangeTo({
              color: '#000'
            }, 100, Easing.quadInOut),
            ANI.Wait()
          ]])
        })
      ];
      layer.unshift(l);
      l = [
        SP.StarField({
          moveZ: 0,
          a: 0,
          animation: Sequence(1, -39500, [[
            ANI.ChangeTo({
              moveZ: -14,
              a: 1
            }, 500),
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
          animation: Sequence(1, -2000, [[
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
        SP.Image({
          image: 't1',
          x: 450,
          y: 390,
          scaleX: 1.2,
          scaleY: 1.2,
          a: 0,
          animation: Sequence(1, -10000, [[
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
        SP.Image({
          image: 's2',
          x: 350,
          y: 240,
          scaleX: 1.1,
          scaleY: 1.1,
          a: 0,
          animation: Sequence(1, -18000, [[
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
              scaleX: 1.2,
              scaleY: 1.2
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
          animation: Sequence(1, -26000, [[
            ANI.Callback(()=>Audiomanager.playSound('sfx', 'gestoehn'), 0),
            ANI.ChangeTo({
              scaleX: 10,
              scaleY: 10
            },1000),
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
          animation: Sequence(1, -26000, [[
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
        SP.Text({
          text: 'TURBO',
          x: 400,
          y: 240,
          color: '#FFF',
          font: '65px Audiowide',
          a: 0,
          arc: 30,
          scaleX: 1.4,
          scaleY: 1.4,
          borderColor: '#ffc0cb',
          lineWidth: 4,
          animation: Sequence(1, -43300, [[
            ANI.ChangeTo({
              a: 1,
              arc: 20
            }, 100, Easing.quadOut),
            ANI.Wait()
          ], [
            ANI.ChangeTo({
              scaleX: 1,
              scaleY: 1
            }, 200, Easing.bounceOut)
          ]])
        }),
        SP.Text({
          text: 'Super',
          x: 150,
          y: 120,
          color: '#DDF',
          font: '65px Audiowide',
          a: 0,
          arc: -30,
          animation: Sequence(1, -41000, [[
            ANI.ChangeTo({
              a: 1,
            }, 100, Easing.quadOut),
            ANI.Wait()
          ]])
        }),
        SP.Text({
          text: 'Müller',
          x: 400,
          y: 80,
          color: '#FDD',
          font: '90px Audiowide',
          a: 0,
          arc: 0,
          animation: Sequence(1, -41300, [[
            ANI.ChangeTo({
              a: 1,
            }, 100, Easing.quadOut),
            ANI.Wait()
          ]])
        }),
        SP.Text({
          text: 'Adventure',
          x: 400,
          y: 300,
          color: '#FDD',
          font: '90px Audiowide',
          a: 0,
          arc: 0,
          animation: Sequence(1, -41800, [[
            ANI.ChangeTo({
              a: 1,
            }, 100, Easing.quadOut),
            ANI.Wait()
          ]])
        }),
        SP.Text({
          text: 'Deluxe',
          x: 650,
          y: 120,
          color: '#DDF',
          font: '65px Audiowide',
          a: 0,
          arc: 30,
          animation: Sequence(1, -42100, [[
            ANI.ChangeTo({
              a: 1,
            }, 100, Easing.quadOut),
            ANI.Wait()
          ]])
        }),

      ];
      layer.unshift(l);
      l = [
        SP.Image({
          image: 'walking',
          x: -50,
          y: 400,
          a: 1,
          frameWidth: 48,
          animation: Sequence(true, -43500, [[
            ANI.ImageFrame([0, 1, 2, 3, 4, 5, 6], true, 50)
          ], [
            ANI.ChangeTo({
              x: 850
            }, 3000),
            ANI.ChangeTo({
              x: -50
            })
          ]])
        }),
      ];
      layer.unshift(l);
      l = [];
      for (let i = 0; i < 20; i++) {
        l.push(explosion(Math.random() * (engine.getWidth() - 100) + 50, Math.random() * (engine.getHeight() - 100) + 50, Math.floor(41000 + i * 1000 + 1000 * Math.random())));
      }
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
      l=[];
      textBox(l, 'Oh Tobi! Du bist mein Ein und Alles!', 425, 50, 350, 2500);
      textBox(l, 'Yeah! Du rockst mein Hearth', 50, 250, 270, 10500);
      textBox(l, 'Wuff wuff wuff', 250, 100, 170, 18500);
      textBox(l, 'Oh ja! Wir sind glücklich!', 510, 80, 250, 26500);
      textBox(l, 'Oh nein! Steffi wird entführt!', 250, 260, 300, 33500);
      textBox(l, 'Oh nein!', 100, 10, 100, 34000);
      textBox(l, 'Oh nein!', 350, 360, 100, 34500);
      textBox(l, 'Oh nein!', 550, 100, 100, 35000);
      layer.unshift(l);

      let play = _once(function () {
        Audiomanager.playSound('sfx', 'intro');
      });
      l = [
        function (ctx, t) {
          if (t >= 41000) {
            play();
          }
        }
      ];
      layer.unshift(l);
      l = [
        function (ctx, t) {
          console.log(t);
        }
      ];
      layer.unshift(l);
      return layer;
    });
    engine.run();

    function destroy () {
      canvas.removeEventListener('click', destroy, false);
      window.removeEventListener('keydown', destroy, false);

      engine.destroy();
      audio.pause();
      audio = null;

      // clear dom
      let myNode = document.getElementById('main');
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }

      resolve();
    }

    canvas.addEventListener('click', destroy, false);
    window.addEventListener(
      'keydown', destroy, false
    );
  });
}

export default Intro;