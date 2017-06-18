function Hero(levelData) {
    if (!(this instanceof Hero)) return new Hero(levelData);
    this.dead = 0;
    this.ax = 0;
    this.ay = 0;
    this.x = 0;
    this.y = -100;
    this.size = 1;
    this.height = levelData.blockSize * this.size;
    this.width = levelData.blockSize;

    this.canJump = false;
    this.canJumpDelay = 0;

    this.walkingFrames = [];
    this.idleFrames = [];
    this.jumpingFrames = [];

    this.currentAnim = 'none';
}

Hero.prototype.load = function () {
    PIXI.loader
        .add('./assets/idle.json')
        .add('./assets/jumping.json')
        .add('./assets/walking.json')
        .load(function () {
            for (var i = 0; i < 7; i++) {
                var val = '0' + i;

                this.idleFrames.push(PIXI.Texture.fromFrame('idle' + val + '.png'));
                this.walkingFrames.push(PIXI.Texture.fromFrame('walking' + val + '.png'));
                this.jumpingFrames.push(PIXI.Texture.fromFrame('jumping' + val + '.png'));
            }

            // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
            this.sprite = new PIXI.extras.AnimatedSprite(this.walkingFrames);
            this.sprite.width = this.width;
            this.sprite.x = this.x;
            this.sprite.y = this.y;
            this.sprite.animationSpeed = 0.05;

            // this.sprite.play();
        }.bind(this));
};

Hero.prototype.addSpritesToStage = function (stage) {
    stage.addChild(this.sprite);
};

Hero.prototype.checkAnimation = function() {
    // jumping
    if (!this.canJump && !this.dead) {
        this.sprite.animationSpeed = 0.13;

        if (this.currentAnim !== 'jumping') {
            this.currentAnim = 'jumping';
            this.sprite.textures = this.jumpingFrames;
        }
    }
    else {
        this.sprite.animationSpeed = 0.05;

        if (this.ax === 0 || this.dead) {
            if (this.currentAnim !== 'idle') {
                this.currentAnim = 'idle';
                this.sprite.textures = this.idleFrames;
            }
        }
        else if (this.ax < 0) {
            if (this.currentAnim !== 'walking') {
                this.currentAnim = 'walking';
                this.sprite.textures = this.walkingFrames;
            }

            this.sprite.scale.x = -1;
            this.sprite.anchor.set(1, 0);
        }
        else if (this.ax > 0){
            if (this.currentAnim !== 'walking') {
                this.currentAnim = 'walking';
                this.sprite.textures = this.walkingFrames;
            }

            this.sprite.scale.x = 1;
            this.sprite.anchor.set(0, 0);
        }
    }

    if (!this.sprite.playing) {
        this.sprite.play();
    }
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
    // console.log('PLAYYY');
    // this.sprite.play();
    // this.sprite.texture = PIXI.loader.resources["H" + (special ? "2" : "1")].texture;
};

Hero.prototype.checkFloorDeath = function (level) {
    if (this.y >= level.height - this.height) {
        this.y = level.height - this.height;
        this.ay = -22;
        this.dead = 1;
        return true;
    }
    return false;
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