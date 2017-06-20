const _inRange = require('lodash/inRange');

function Level (levelData) {
  if (!(this instanceof Level)) return new Level(levelData);

  let level = levelData.level();
  this.levelData = levelData;
  this.data = [];
  for (let y = 0; y < level.length; y++) {
    this.data[y] = [];

    for (let x = 0; x < level[y].length; x++) {
      let asc = level[y].charCodeAt(x);
      if (asc < 97) {
        this.data[y][x] = asc - 48;
      } else {
        this.data[y][x] = asc - 87;
      }
    }
  }

  this.blockSize = levelData.blockSize;
  this.musicFile = levelData.musicFile;
  this.width = level[0].length * this.blockSize;
  this.height = level.length * this.blockSize;
  this.checkIsOccupied = this.levelData.blockChecks.isOcuppied;
  this.checkIsVictory = this.levelData.blockChecks.isVictory;
  this.checkIsStandable = this.levelData.blockChecks.isStandable;
}

Level.prototype.getLevelData = function (x, y) {
  if (y < 0) {
    return this.getLevelData(x, 0);
  }
  if (y >= this.data.length) {
    return 0;
  }
  if (x < 0 || x >= this.data[y].length) {
    return 10;
  }
  return this.data[y][x];
};

Level.prototype.addSpritesToStage = function (stage) {
  for (let y = 0; y < this.data.length; y++) {
    for (let x = 0; x < this.data[y].length; x++) {
      if (this.data[y][x]) {
        let sprite = new PIXI.Sprite(
          this.levelData.getTextureBlock(this.data[y][x])
        );
        sprite.x = x * this.blockSize;
        sprite.y = y * this.blockSize;
        sprite.width = sprite.height = this.blockSize;
        stage.addChild(sprite);
      }
    }
  }
};

Level.prototype.addBackgroundToStage = function (stage) {
  try {
    let sprite = new PIXI.Sprite(
      this.levelData.getTextureBackground()
    );
    sprite.width = 800;
    sprite.height = 480;

    stage.addChild(sprite);
  } catch (e) {}
};

Level.prototype.pixelPositionToLevelPosition = function (pixelX, pixelY) {
  return [Math.floor(pixelX / this.blockSize), Math.floor(pixelY / this.blockSize)];
};

Level.prototype.isCheck = function (pixelX, pixelY, sizeX, sizeY, callback) {
  let [x, y] = this.pixelPositionToLevelPosition(pixelX, pixelY);
  sizeX = Math.max(0, sizeX - (pixelX % this.blockSize === 0 ? 1 : 0));
  sizeY = Math.max(0, sizeY - (pixelY % this.blockSize === 0 ? 1 : 0));

  for (let repeatX = 0; repeatX <= sizeX; repeatX++) {
    for (let repeatY = 0; repeatY <= sizeY; repeatY++) {
      if (callback(x + repeatX, y + repeatY)) {
        return true;
      }

    }
  }
  return false;
};

Level.prototype.isOccupied = function (pixelX, pixelY, sizeX = 0, sizeY = 0) {
  return this.isCheck(pixelX, pixelY, sizeX, sizeY, (x, y) => this.checkIsOccupied(this.getLevelData(x, y)));
};


Level.prototype.isStandable = function (pixelX, pixelY, sizeX = 0, sizeY = 0) {
  return this.isCheck(pixelX, pixelY, sizeX, sizeY, (x, y) => this.checkIsOccupied(this.getLevelData(x, y)) || this.checkIsStandable(this.getLevelData(x, y)));
};

Level.prototype.isVictory = function (pixelX, pixelY, sizeX = 0, sizeY = 0) {
  return this.isCheck(pixelX, pixelY, sizeX, sizeY, (x, y) => this.checkIsVictory(this.getLevelData(x, y)));
};

module.exports = Level;
