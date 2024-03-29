import Position from "/src/position.js";
import collisionDetection from "/src/collisionDetection.js";

export default class SpaceShip {

    constructor(game) {
        this.image = document.querySelector(".space-ship");
        this.game = game;
        this.position = new Position(240,480);
        this.speed = 0;
        this.width = 30;
        this.height = 40;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
    }

    update(deltaTime) {
        if ((this.speed < 0 && this.position.x <= 0) ||
            (this.speed > 0 && this.position.x >= (this.game.gameWidth - this.width))) {
            this.position.x = this.speed < 0 ? 5 : this.game.gameWidth - this.width - 5;
        }
        this.position.x += (this.speed * deltaTime);
        this.game.missiles.forEach(missile => {
            if (!missile.isSpaceShipMissile && collisionDetection(this, missile)) {
                missile.markedForRemoval = true;
                this.game.onSpaceShipCollision();  
            }
        });
    }

    moveLeft() {
        this.speed = -0.2;
    }

    moveRight() {
        this.speed = 0.2;
    }

    stop() {
        this.speed = 0;
    }
}
