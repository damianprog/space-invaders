import Game from "/src/game.js";
import collisionDetection from "/src/collisionDetection.js";

export default class Alien {
    constructor(game, type, position) {
        this.game = game;
        this.type = type;
        this.position = position;
        this.images = [document.querySelector(`.alien-${this.type}-0`),
        document.querySelector(`.alien-${this.type}-1`)];
        this.imageState = 0;
        this.width = 22;
        this.height = 22;
        this.speed = 10;
        this.markedForRemoval = false;
    }

    draw(ctx) {
        ctx.drawImage(
            this.images[this.imageState],
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
    }

    update(deltaTime) {
        const missile = this.game.getSpaceShipMissile();
        if (missile && collisionDetection(this, missile)) {
            this.markedForRemoval = true;
            missile.markedForRemoval = true;
            this.game.onAlienCollision();
        }
    }

    move() {
        this.imageState = this.imageState ? 0 : 1;
        this.position.x += this.speed;
    }

    changeDirection() {
        this.speed = -this.speed;
        this.position.y = this.position.y + this.height;
    }
}
