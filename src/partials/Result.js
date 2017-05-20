import { SVG_NS } from '../settings';

export default class Board {
  constructor(width, height, size) {
    this.width = width;
    this.height = height;
    this.size = size;
  }
  render(svg, winner) {
    let text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, 'font-size', '30px');
    text.setAttributeNS(null, 'font-family', 'Ariel')
    text.setAttributeNS(null, 'x', this.width / 4);
    text.setAttributeNS(null, 'y', this.height / 3);
    text.setAttributeNS(null, 'fill', 'pink');
    text.textContent = winner;



    svg.appendChild(text);
  }
}

