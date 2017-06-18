function Keyboard (keyCode) {
  if (!(this instanceof Keyboard)) return new Keyboard(keyCode);

  this.code = keyCode;
  this.isDown = false;
  this.isUp = true;
  this.press = undefined;
  this.release = undefined;
  //The `downHandler`
  this.downHandler = function (event) {
    if (event.keyCode === this.code) {
      if (this.isUp && this.press) this.press();
      this.isDown = true;
      this.isUp = false;

      event.preventDefault();
    }
  };

  //The `upHandler`
  this.upHandler = function (event) {
    if (event.keyCode === this.code) {
      if (this.isDown && this.release) this.release();
      this.isDown = false;
      this.isUp = true;

      event.preventDefault();
    }
  };

  //Attach event listeners
  window.addEventListener(
    'keydown', this.downHandler.bind(this), false
  );
  window.addEventListener(
    'keyup', this.upHandler.bind(this), false
  );
}

Keyboard.prototype.destroy = function () {
  window.removeEventListener('keydown', this.downHandler.bind(this), false);
  window.removeEventListener('keyup', this.upHandler.bind(this), false);
};

module.exports = Keyboard;