const Dino = require('./dino');

class Button extends Dino {
  constructor(levelData, x, y, spriteNumber) {
    super(levelData, x, y);
    this.height = this.orgHeight = levelData.blockSize * 2;
    this.spriteNumber = spriteNumber;
    this.t = 0;
    this.deathLine = 16;
    this.spriteName = 'BUTTON';
    this.hitPoints = 3;
  }

  update(level, hero) {
    if (!this.hitPoints) {
      return false;
    }

    this.y = this.y + 2;

    if (this.y > level.height) {
      this.hitPoints = 0;
    }

    this.sprite.y = this.y;
  }

  addSpritesToStage(stage) {
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources[this.spriteName + this.spriteNumber].texture
    );
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.width = PIXI.loader.resources[this.spriteName + this.spriteNumber].texture.width;
    this.height = PIXI.loader.resources[this.spriteName + this.spriteNumber].texture.height;

    stage.addChild(this.sprite);
  }

  load() {
    try {
      PIXI.loader.add(this.spriteName + '0', 'assets/enemies/button/join_now_n.gif');
      PIXI.loader.add(this.spriteName + '1', 'assets/enemies/button/order_n.gif');
      PIXI.loader.add(this.spriteName + '2', 'assets/enemies/button/read_n.gif');
      PIXI.loader.add(this.spriteName + '3', 'assets/enemies/button/start_game_d.png');
    } catch (e) {
    }
  }
}

module.exports = Button;
