function Level (levelData) {
  if (!(this instanceof Level)) return new Level(levelData);

  let level = levelData.level();
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
  this.width = level[0].length * this.blockSize;
  this.height = level.length * this.blockSize;
}

Level.prototype.getLevelData = function (x, y) {
  if (y < 0 || y >= this.data.length) {
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
          PIXI.loader.resources['j' + this.data[y][x]].texture
        );
        sprite.x = x * 48;
        sprite.y = y * 48;
        stage.addChild(sprite);
      }
    }
  }
};

Level.prototype.pixelPositionToLevelPosition = function (pixelX, pixelY) {
  return [Math.floor(pixelX / this.blockSize), Math.floor(pixelY / this.blockSize)];
};

Level.prototype.isOccupied = function (pixelX, pixelY, sizeX = 0, sizeY = 0) {
  let [x, y] = this.pixelPositionToLevelPosition(pixelX, pixelY);
  sizeX = Math.max(0, sizeX - (pixelX % this.blockSize === 0 ? 1 : 0));
  sizeY = Math.max(0, sizeY - (pixelY % this.blockSize === 0 ? 1 : 0));

  for (let repeatX = 0; repeatX <= sizeX; repeatX++) {
    for (let repeatY = 0; repeatY <= sizeY; repeatY++) {
      if (this.getLevelData(x + repeatX, y + repeatY) > 9) {
        return true;
      }

    }
  }
  return false;
};

module.exports = Level;
