function Enemies(levelData) {
    if (!(this instanceof Enemies)) return new Enemies(levelData);
    this.array = [];

    levelData.enemies(this);
}

Enemies.prototype.reset = function() {
    this.array = [];
};

Enemies.prototype.add = function(enemy) {
    this.array.push(enemy);
};

Enemies.prototype.load = function() {
    this.array.forEach((enemy) => {
        enemy.load();
    })
};

Enemies.prototype.update = function(level, hero) {
    this.array.forEach((enemy) => {
        enemy.update(level, hero);
    })
};

Enemies.prototype.collision = function(hero) {
    this.array.forEach((enemy) => {
        enemy.collision(hero);
    })
};

Enemies.prototype.addSpritesToStage = function(stage) {
    this.array.forEach((enemy) => {
        enemy.addSpritesToStage(stage);
    })
};

module.exports = Enemies;