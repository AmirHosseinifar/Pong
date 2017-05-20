import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = 8;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-03.wav');
    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    // generate a random number between -5 and 5, that's not 0
    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }



    // a number between -5 and 5, based on the the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    //if moving toward right...
    if (this.vx > 0) {
      // check collision on playr 2
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);

      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX // the right edge of the ball is >= left edge of the paddle
        && this.x + this.radius <= rightX// && the right edge of the ball <= right edge paddle
        && this.y >= topY// && the ball Y is >= the top edge of the paddle
        && this.y <= bottomY// && the ball is <= the bottom edge of the paddle

      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x - this.radius <= rightX // the left edge of the ball is <= right edge of the paddle
        && this.x - this.radius >= leftX// && the left edge of the ball >= left edge paddle
        && this.y >= topY// && the ball Y is >= the top edge of the paddle
        && this.y <= bottomY// && the ball is <= the bottom edge of the paddle

      ) {
        this.vx = -this.vx
        this.ping.play();
      }
    }
  }

  goal(player) {
    player.score++;
    this.reset();
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2)
    const ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(ball);

    const ball2 = document.createElementNS(SVG_NS, 'circle');
    ball2.setAttributeNS(null, 'r', this.radius);
    ball2.setAttributeNS(null, 'cx', this.x);
    ball2.setAttributeNS(null, 'cy', this.y);
    ball2.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(ball2);

    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1)
      this.direction = 1;

    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;

    }
  }
}


