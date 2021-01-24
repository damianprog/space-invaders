import Game from "/src/game.js";

export default class Alien {
    constructor(game, type, position) {
        this.game = game;
        this.type = type;
        this.position = position;
        this.images = [document.querySelector(`.alien-${this.type}-0`),
        document.querySelector(`.alien-${this.type}-1`)]
        this.imageState = 0
        this.size = 22;
        this.speed = 10;
    }

    draw(ctx) {
        ctx.drawImage(
            this.images[this.imageState],
            this.position.x,
            this.position.y,
            this.size,
            this.size,
        );
    }

    update() {
        
    }

    move() {
        this.imageState = this.imageState ? 0 : 1;
        this.position.x += this.speed;
    }

    changeDirection() {
        this.speed = -this.speed;
        this.position.y = this.position.y + this.size;
    }
}