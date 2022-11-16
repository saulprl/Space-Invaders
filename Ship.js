class Ship {
  constructor() {
    this.x = (width - 120) / 2;
    this.dir = 0;
    this.lives = 3;
    this.dead = false;
    this.hit = false;

    this.show = function () {
      noFill();
      noStroke();
      triangle(
        this.x,
        height - 30,
        this.x + 20,
        height - 10,
        this.x - 20,
        height - 10
      );
      image(shipIcon, this.x, height - 30, 40, 40);
    };

    this.move = function () {
      this.x += this.dir * 5;

      this.x = constrain(this.x, 20, 400);
    };

    this.death = function () {
      if (this.lives === 1) {
        this.dead = true;
        this.lives--;
      } else {
        this.lives--;
      }
    };

    this.lock = function () {
      if (this.dead) {
        this.x = (width - 120) / 2;
        this.x = constrain(this.x, (width - 120) / 2, (width - 120) / 2);
      }
    };
  }
}
