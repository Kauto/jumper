function Hero(levelData) {
    if (!(this instanceof Hero)) return new Hero(levelData);
    this.dead = 0;
    this.ax = 0;
    this.ay = 0;
    this.x = 0;
    this.y = -100;
    this.size = 2;
    this.height = levelData.blockSize * this.size;
    this.width = levelData.blockSize;

    this.canJump = false;
    this.canJumpDelay = 0;
}

Hero.prototype.load = function () {
    for (let i = 1; i <= 4; i++) {
        PIXI.loader.add('H' + i, "assets/h" + i + ".png");
    }
};

Hero.prototype.addSpritesToStage = function (stage) {
    this.sprite = new PIXI.Sprite(
        PIXI.loader.resources["H1"].texture
    );
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    stage.addChild(this.sprite);
};

Hero.prototype.updatePositionX = function (level) {
    if (level.isOccupied(this.x + this.ax + (this.ax > 0 ? this.width : 0), this.y, 0, this.size)) {
        this.x = Math.round(this.x / level.blockSize) * level.blockSize;
        this.ax = 0;
    } else {
        this.x += this.ax;
    }
    this.sprite.x = this.x;
};

Hero.prototype.updatePositionY = function () {
    this.y += this.ay;
    this.sprite.y = this.y;
};

Hero.prototype.applyAdditionalForce = function (ax, ay) {
    this.ax += ax;
    this.ay += ay;
};

Hero.prototype.moveInAir = function () {
    if (this.canJump) {
        this.ax = 0;
    } else {
        if (this.ax < -0.2) {
            this.ax = this.ax + 0.2;
        } else {
            if (this.ax > 0.2) {
                this.ax = this.ax - 0.2
            } else {
                this.ax = 0;
            }
        }
    }
};

Hero.prototype.animate = function (special) {
    this.sprite.texture = PIXI.loader.resources["H" + (special ? "2" : "1")].texture;
};

Hero.prototype.checkFloorDeath = function (level) {
    if (this.y >= level.height - this.height) {
        this.y = level.height - this.height;
        this.ay = -22;
        this.dead = 1;
    }
};

Hero.prototype.checkFloor = function (level) {
    if (this.y >= -this.height) {
        if (level.isOccupied(this.x, this.y + this.height, 1)) {
            this.y = Math.floor(this.y / level.blockSize) * level.blockSize;
            this.ay = -this.ay / 6;
            this.canJump = true;
            this.canJumpDelay = 5;
        } else {
            if (this.canJumpDelay === 0) {
                this.canJump = false;
            } else {
                this.canJumpDelay -= 1;
            }
        }
    }
};

Hero.prototype.checkCeiling = function (level) {
    if (this.y > 0) {
        if (level.isOccupied(this.x, this.y, 1)) {
            this.y = Math.round(this.y / level.blockSize) * level.blockSize + 1;
            this.ay = 0;
        }
    }
};

Hero.prototype.deathAnimation = function (level) {
    if (this.dead === 1) {
        //BeginPlaySound Games & "e_laugh.wav"
        this.dead = this.dead + 1;
    }
    if (this.y > level.height) {
        this.y = level.height + 1;
        this.dead += 1;
    } else {
        //hero.sprite.rotation += 0.1;
        //Addpartikel 1, hero.sprite.x + 20 - LevelX, hero.sprite.y, hero.sprite.x + 28 - LevelX, hero.sprite.y + 48, True
    }
    return (this.dead >= 55);
};


module.exports = Hero;