import { SVG_NS, KEYS, SCORE } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Result from './Result'

export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;
		this.player1Score = new Score(this.width / 2 - SCORE.distance, SCORE.topDistance, SCORE.size);
		this.player2Score = new Score(this.width / 2 + SCORE.distance, SCORE.topDistance, SCORE.size);

		this.gameElement = document.getElementById(element)

		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		this.board = new Board(width, height)
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.padding = 10;
		this.radius = 8;

		this.ball = new Ball(
			this.radius,
			this.width,
			this.height,
		);

		this.ball2 = new Ball(
			this.radius,
			this.width,
			this.height,
		);


		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.padding,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z,
			KEYS.x,
			KEYS.s
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.paddleWidth - this.padding),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down,
			KEYS.left,
			KEYS.right
		);

		this.result = new Result(
			this.width,
			this.height,
			this.SCORE

		)

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})

		this.ball2.vx = 0;
		this.ball2.vy = 0;

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.b) {
				this.ball2.vx = this.ball.vx,
					this.ball2.vy = this.ball.vy
			}
		})
	}



	winnerPlayer(svg, player) {
		this.result.render(svg, `The Winner is ${player}`);
		this.pause = true;
	}

	render() {

		if (this.pause) {
			return;
		}
		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.player1Score.render(svg, this.player1.score)
		this.player2Score.render(svg, this.player2.score)
		this.player1.render(svg);
		this.player2.render(svg);

		this.ball.render(svg, this.player1, this.player2);
		this.ball2.render(svg, this.player1, this.player2)

		if (this.player1.score === 15) {
			this.winnerPlayer(svg, 'Player 1')
		} else if (this.player2.score === 15) {
			this.winnerPlayer(svg, 'Player 2')
		}

	}
}


