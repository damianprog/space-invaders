export default class Missile {
    constructor(game, position, isAlienMissile = false) {
        this.image = document.querySelector(".missile");
        this.position = position;
        this.isAlienMissile = isAlienMissile;
        this.speed = isAlienMissile ? 0.3 : -0.6;
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
    }
}
