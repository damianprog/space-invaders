export default class Missile {
    constructor(game, position, isSpaceShipMissile = false) {
        this.image = document.querySelector(".missile");
        this.game = game;
        this.position = position;
        this.isSpaceShipMissile = isSpaceShipMissile;
        this.speed = isSpaceShipMissile ? -0.6 : 0.3;
        this.width = 10;
        this.height = 10;
        this.markedForRemoval = false;
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
        this.position.y += (this.speed * deltaTime);

        if(this.position.y < 0 || this.position.y > this.game.height) this.markedForRemoval = true;
    }
}
