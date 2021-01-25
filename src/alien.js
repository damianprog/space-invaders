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
        this.markedForRemoval = false;
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

    update(deltaTime) {
        const missile = this.game.missile;
        if (missile) {
            const bottomOfMissile = missile.position.y + missile.size;
            const topOfMissile = missile.position.y;

            const topOfAlien = this.position.y;
            const leftSideOfAlien = this.position.x;
            const rightSideOfAlien = this.position.x + this.size;
            const bottomOfAlien = this.position.y + this.size;
            if (
                bottomOfMissile >= topOfAlien &&
                topOfMissile <= bottomOfAlien && 
                missile.position.x + missile.size >= leftSideOfAlien &&
                missile.position.x <= rightSideOfAlien
            ) {
                this.markedForRemoval = true;
                this.game.missile = null;
            }
        }
        // console.log("Update alien");
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
