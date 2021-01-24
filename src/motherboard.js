import Game from "/src/game.js";
import Alien from "/src/alien.js";

export default class Motherboard {
    constructor(game, aliens) {
        this.game = game;
        this.aliens = aliens;
        this.moveAliens = true;
        this.setAliensMove();
    }

    setAliensMove() {
        setInterval(() => this.moveAliens = true, 1000);
    }

    draw(ctx) {
        this.aliens.forEach(alien => alien.draw(ctx));
    }

    update() {
        if (this.moveAliens) {
            const isAlienOnEdge = this.aliens.some(alien => {
                return alien.position.x <= 0 ||
                    alien.position.x >= (this.game.gameWidth - alien.size);
            });
            this.aliens.forEach(alien => {
                if (isAlienOnEdge) alien.changeDirection();
                alien.move();
            });
            this.moveAliens = !this.moveAliens;
        }
    }
}