import { SVG_NS } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, left, right) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 15;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
        case left:
          this.left();
          break;
        case right:
          this.right();
          break;
      }
    });

  }
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  up() {
    this.y = Math.max(0, this.y - this.speed)
  }

  down() {
    this.y = Math.min((this.boardHeight - this.height), (this.y + this.speed))
  }

  left() {
    this.x = Math.max(0, this.x - this.speed)
  }

  right() {
    this.x = Math.max((- this.width), (this.x + this.speed))
  }
  render(svg) {

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    rect.setAttributeNS(null, 'fill', 'white');

    svg.appendChild(rect)
  }
}