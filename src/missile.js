export default class Missile {
    constructor(game, position) {
        this.image = document.querySelector(".missile");
        this.position = position;
        this.speed = 0.6;
        this.size = 10;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size,
        );
    }

    update(deltaTime) {
        this.position.y -= (this.speed * deltaTime);
    }
}