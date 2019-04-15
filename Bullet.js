function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDestroy = false;

    this.show = function() {
        noFill();
        noStroke();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        image(bolt, this.x, this.y, 14, 14);
    };

    this.move = function() {
        this.y += -10;
    };

    this.offScreen = function() {
        return this.y <= -this.r;
    };

    this.hits = function(alien) {
        let distance = dist(this.x, this.y, alien.x, alien.y);

        return distance <= (this.r + alien.r);
    };

    this.destroy = function() {
        this.toDestroy = true;
    }
}