function Emitters() {
    if (!(this instanceof Emitters)) return new Enemies();
    this.array = {};
}

Emitters.prototype.reset = function () {
    this.array.forEach((emitter) => {
        emitter.destroy();
    });
    this.array = [];
    if (renderer.plugins && renderer.plugins.sprite && renderer.plugins.sprite.sprites)
      renderer.plugins.sprite.sprites.length = 0;
};

Emitters.prototype.add = function (emitter) {
    this.array.push(emitter);
};

Emitters.prototype.update = function (elapsedTime) {
    this.array.forEach((emitter) => {
        emitter.update(elapsedTime);
    });
};


Emitters.prototype.destroy = function () {
  this.reset();
};


module.exports = Emitters;