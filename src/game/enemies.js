function Enemies (levelData) {
  if (!(this instanceof Enemies)) return new Enemies(levelData);
  this.array = [];

  levelData.enemies(this);
}

Enemies.prototype.reset = function () {
  this.array = [];
};

Enemies.prototype.add = function (enemy) {
  this.array.push(enemy);
};

Enemies.prototype.load = function () {
  this.array.forEach((enemy) => {
    enemy.load();
  });
};

Enemies.prototype.update = function (level, hero) {
  let result = false;

  this.array.forEach((enemy) => {
    result = enemy.update(level, hero) || result;
  });

  return result;
};

Enemies.prototype.collision = function (hero) {
  let result = false;

  this.array.forEach((enemy) => {
    result = enemy.collision(hero) || result;
  });

  return result;
};

Enemies.prototype.addEmitter = function (emitters) {
  let result = false;

  this.array.forEach((enemy) => {
    result = enemy.addEmitter(emitters);
  });
};

Enemies.prototype.addSpritesToStage = function (stage) {
  this.array.forEach((enemy) => {
    enemy.addSpritesToStage(stage);
  });
};

module.exports = Enemies;