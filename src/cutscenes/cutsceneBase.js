import {
  Engine,
  Scenes,
  Sprites,
  Sequence,
  Animations,
  Easing
} from 'animationvideo';

export default function (options) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 480;
    document.getElementById('main').appendChild(canvas);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';

    let scene, engine, audio;

    if (options.music) {
      audio = document.createElement('audio');

      if (process.env.NODE_ENV === 'development') {
        // for debug
        audio.controls = true;
        document.getElementById('main').appendChild(audio);
        audio.onerror = () => audio.src = options.music + '.mp3';
        // try skippable
        audio.src = options.music + '.php';
      } else {
        audio.src = options.music + '.mp3';
      }

      audio.preload = 'auto';
      audio.load();

      scene = Scenes.Audio(audio);
    } else {
      scene = Scenes.Default();
    }

    engine = Engine(canvas, scene);

    if (options.loading) {
      scene.loading(options.loading);
    }

    scene.init(options.images).scene((scene, layer) => {
      layer = options.animation(scene, layer, destroy);

      if (process.env.NODE_ENV === 'development') {
        layer.unshift([
          function (ctx, t) {
            console.log(t);
          }
        ]);
      }
      return layer;
    });
    engine.run();

    function destroy () {
      canvas.removeEventListener('click', destroy, false);
      window.removeEventListener('keydown', destroy, false);

      engine.destroy();
      audio && audio.pause();
      audio = null;

      // clear dom
      let myNode = document.getElementById('main');
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }

      resolve();
    }

    if (options.addBindings || options.addBindings === undefined) {
      canvas.addEventListener('click', destroy, false);
      window.addEventListener(
        'keydown', destroy, false
      );
    }
  });
};