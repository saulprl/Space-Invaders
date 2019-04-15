function Alien(x, y, dir) {
    this.x = x;
    this.y = y;
    this.r = 16;
    this.dir = dir;
    this.toDestroy = false;

    this.show = function() {
        noFill();
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        image(alien, this.x, this.y, 32, 32);
    };

    this.move = function() {
        this.x += this.dir * 0.3;
    };

    this.bringCloser = function(times) {
        this.y += 48 * times;
    };

    this.edge = function() {
        if (this.x < 30) {
            this.x = 30;
            return true;
        } else if (this.x > 390) {
            this.x = 390;
            return true;
        }
        return false;
    };

    this.destroy = function() {
        this.toDestroy = true;
    };

    this.verticalLimit = function() {
        return this.y > 460;
    };
}