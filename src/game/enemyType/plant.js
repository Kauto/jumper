const Dino = require('./dino');

class Plant extends Dino {
    constructor(levelData, x, y) {
        super(levelData, x, y);
        this.height = this.orgHeight = levelData.blockSize * 2;
        this.orgY = y;
        this.t = 0;
        this.deathLine = 0;
    }

    update(level, hero) {
        this.animate();

        this.t = this.t + 0.021;
        let s = Math.sin(this.t);
        this.height = this.orgHeight / 2 + s * (this.orgHeight / 2 );
        this.y = this.orgY + (this.orgHeight - this.height);

        this.sprite.texture = PIXI.loader.resources["G1" + this.ani + ((this.x + this.width / 2 < hero.x + hero.width / 2) ? "d" : "")].texture;
        this.sprite.y = this.y;
        this.sprite.height = this.height;
    }

    addSpritesToStage(stage) {
        this.sprite = new PIXI.Sprite(
            PIXI.loader.resources["G10"].texture
        );
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        stage.addChild(this.sprite);
    }


    load() {
        try {
            PIXI.loader.add('G10', "assets/G10.png");
            PIXI.loader.add('G10d', "assets/G10d.png");
            PIXI.loader.add('G11', "assets/G11.png");
            PIXI.loader.add('G11d', "assets/G11d.png");
        } catch (e) {
        }
    }
}

module.exports = Plant;