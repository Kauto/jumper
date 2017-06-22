import {
  Sprites as SP,
  Animations as ANI,
  Sequence,
  Easing
} from 'animationvideo';
import { textBox, explosion } from './effects/effects';
import cutsceneBase from './cutsceneBase';

export default function (Audiomanager) {
  return cutsceneBase({
    music: 'assets/music/intro',
    images: {
      's1': 'assets/intro/s1.jpg',
      's2': 'assets/intro/s2.jpg',
      't1': 'assets/intro/t1.jpg',
      'st1': 'assets/intro/st1.jpg',
      'walking': 'assets/walking.png'
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
            ANI.Callback(() => Audiomanager.playSound('sfx', 'dog'), 0),
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
          x: 400,
          y: 200,
          width: 150,
          height: 80,
          pixel: true,
          scaleX: 1,
          scaleY: 1,
          animation: Sequence(1, -26000, [[
            ANI.Callback(() => Audiomanager.playSound('sfx', 'gestoehn'), 0),
            ANI.ChangeTo({
              scaleX: 15,
              scaleY: 15
            }, 1000),
            ANI.Wait(6000)
          ]])
        }),
        SP.Image({
          image: 'st1',
          x: 400,
          y: 290,
          scaleX: 0.9,
          scaleY: 0.9,
          a: 0,
          animation: Sequence(1, -26000, [[
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
              scaleX: 0.8,
              scaleY: 0.8
            }, 7000)
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
            ANI.Callback(() => Audiomanager.playSound('sfx', 'intro'), 0),
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
        SP.Scroller({
          text: 'PRESS START',
          x: (i) => 300 + i * 20,
          y: 420,
          color: '#FFF',
          font: '32px Audiowide',
          a: 1,
          animation: (i) => Sequence(true, -44500 - i * 10, [[
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
        l.push(explosion(Math.random() * (scene.w - 100) + 50, Math.random() * (scene.h - 100) + 50, Math.floor(41000 + i * 1000 + 1000 * Math.random())));
      }
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
      textBox(Audiomanager, l, 'Oh Tobi! Du bist mein Ein und Alles!', 425, 50, 350, 2500);
      textBox(Audiomanager, l, 'Yeah! Du rockst mein Heart!', 50, 250, 260, 10500);
      textBox(Audiomanager, l, 'Wuff wuff wuff', 250, 100, 160, 18500);
      textBox(Audiomanager, l, 'Oh ja! Wir sind glücklich!', 30, 380, 250, 26500);
      textBox(Audiomanager, l, 'Oh nein! Steffi wird entführt!', 250, 260, 300, 33500);
      textBox(Audiomanager, l, 'Oh nein!', 100, 10, 110, 34000);
      textBox(Audiomanager, l, 'Oh nein!', 350, 360, 110, 34500);
      textBox(Audiomanager, l, 'Oh nein!', 550, 100, 110, 35000);
      layer.unshift(l);
      return layer;
    }
  });
}