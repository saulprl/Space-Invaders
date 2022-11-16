let ship;
let aliens;
let bullets;
let shifted;
let paused;
let score;
let pastLimit;
let leftArrow, rightArrow, alien, spacebar, shipIcon, bolt;

function preload() {
  alien = loadImage("./alien.png");
  leftArrow = loadImage("./left-arrow.png");
  rightArrow = loadImage("./right-arrow.png");
  spacebar = loadImage("./spacebar.png");
  shipIcon = loadImage("./ship.png");
  bolt = loadImage("./bolt.png");
}

function setup() {
  createCanvas(540, 600);
  resetSketch();
}

function draw() {
  background(51);
  ship.show();

  if (shifted && !ship.dead) {
    if (frameCount < 1000) {
      createAliens(1);
    } else if (frameCount < 2500) {
      createAliens(2);
    } else {
      createAliens(3);
    }
    shifted = false;
  }

  if (aliens.length !== 0) {
    for (let i = 0; i < aliens.length; i++) {
      aliens[i].show();
      aliens[i].move();

      if (!aliens[i].edge()) {
        continue;
      }
      for (let j = 0; j < aliens.length; j++) {
        if (aliens[j].verticalLimit()) {
          ship.hit = true;
          if (ship.lives > 1) {
            clearAliens();
          }
          break;
        }

        if (frameCount < 1000) {
          aliens[j].bringCloser(1);
        } else if (frameCount < 2500) {
          aliens[j].bringCloser(2);
        } else if (frameCount >= 2500) {
          aliens[j].bringCloser(3);
        }

        aliens[j].dir *= -1;
      }
      shifted = true;
    }
  } else {
    shifted = true;
  }

  if (ship.dead) {
    ship.lock();

    for (let i = 0; i < aliens.length; i++) {
      aliens[i].dir = 0;
    }
    noStroke();
    fill(255, 0, 0);
    strokeWeight(3);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Game Over", (width - 120) / 2, height / 2);

    textSize(20);
    text("Press 'Enter' to try again", (width - 120) / 2, height / 2 + 30);
  } else if (ship.hit) {
    ship.death();
    ship.hit = false;
    pastLimit = false;
  }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].move();

    for (let j = 0; j < aliens.length; j++) {
      if (bullets[i].hits(aliens[j])) {
        score += floor(7 + aliens.length * 0.2);
        aliens[j].destroy();
        bullets[i].destroy();
      } else if (bullets[i].offScreen()) {
        bullets[i].destroy();
      }
    }
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].toDestroy) {
      bullets.splice(i, 1);
    }
  }

  for (let i = aliens.length - 1; i >= 0; i--) {
    if (aliens[i].toDestroy) {
      aliens.splice(i, 1);
    }
  }

  if (frameCount < 120) {
    fill("#ff200d");
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Press 'P' to pause or unpause", (width - 120) / 2, height / 2);
    text("Press 'Enter' to reset", (width - 120) / 2, 350);
  }

  if (paused) {
    fill("#FF200D");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("Paused", (width - 120) / 2, height / 2);
    pauseGame();
  }

  ship.move();
  showScoreboard();
}

function clearAliens() {
  aliens = [];
}

function createAliens(multiplier) {
  let direction = 1;
  for (let i = 0; i < 6; i++) {
    switch (multiplier) {
      case 1:
        aliens.push(new Alien(i * 60 + 30, 40, direction));
        break;
      case 2:
        aliens.push(new Alien(-i * 60 + 390, 40, -direction));
        aliens.push(new Alien(i * 60 + 30, 88, direction));
        break;
      case 3:
        aliens.push(new Alien(i * 60 + 30, 40, direction));
        aliens.push(new Alien(-i * 60 + 390, 88, -direction));
        aliens.push(new Alien(i * 60 + 30, 136, direction));
        break;
      default:
        aliens.push(new Alien(i * 60 + 30, 40, direction));
        multiplier--;
    }
  }
}

function showScoreboard() {
  noStroke();

  fill(0, 255, 0, 40);
  rect(420, 0, 120, 600);

  fill(255, 0, 0);
  strokeWeight(5);
  textSize(20);
  textAlign(RIGHT, CENTER);
  text("Score", 530, 20);

  fill(0);
  rect(425, 29, 110, 22);

  imageMode(CENTER);
  image(leftArrow, 464, 500, 32, 32);
  image(rightArrow, 498, 500, 32, 32);

  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Move", 480, 470);

  imageMode(CENTER);
  image(spacebar, 480, 560, 48, 48);

  text("Fire", 480, 540);

  fill(255, 0, 0);
  textSize(20);
  textAlign(RIGHT, CENTER);
  text("" + score, 530, 42);

  fill(255, 0, 0);
  textSize(20);
  strokeWeight(5);
  textAlign(RIGHT, CENTER);
  text("Lives", 530, 70);

  for (let i = 0; i < ship.lives; i++) {
    image(shipIcon, i * 34 + 446, 98, 32, 32);
  }
}

function keyReleased() {
  switch (keyCode) {
    case 37:
    case 39:
      ship.dir = 0;
      break;
  }
}

function keyPressed() {
  switch (keyCode) {
    case 13:
      resetSketch();
      break;
    case 32:
      if (!ship.dead) {
        let bullet = new Bullet(ship.x, height - 30);
        bullets.push(bullet);
      }
      break;
    case 37:
      ship.dir = -1;
      break;
    case 39:
      ship.dir = 1;
      break;
    case 80:
      paused = !paused;
      if (paused) {
        pauseGame();
      } else {
        unpauseGame();
      }
      break;
  }
}

function resetSketch() {
  ship = new Ship();
  bullets = [];
  aliens = [];
  pastLimit = false;

  frameRate(60);
  frameCount = 0;

  shifted = false;
  paused = false;
  score = 0;

  constrain(ship.x, 20, 400);

  createAliens(3);
}

function pauseGame() {
  noLoop();
}

function unpauseGame() {
  loop();
}
