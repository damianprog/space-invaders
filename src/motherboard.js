import Game from "/src/game.js";
import Alien from "/src/alien.js";

export default class Motherboard {
    constructor(game, aliens) {
        this.game = game;
        this.aliens = aliens;
        this.timeToMove = 1000;
        this.moveAliens = true;
        this.moveInterval = this.setMoveInterval();
    }

    setMoveInterval() {
        return setInterval(() => this.moveAliens = true, this.timeToMove);
    }

    draw(ctx) {
        this.aliens.forEach(alien => alien.draw(ctx));
    }

    update(deltaTime) {
        this.aliens.forEach(alien => alien.update(deltaTime));
        this.aliens = this.aliens.filter(alien => !alien.markedForRemoval);
        if (this.moveAliens) {
            this.restartInterval();
            const isAnyAlienOnEdge = this.isAnyAlienOnEdge();
            this.aliens.forEach(alien => {
                if (isAnyAlienOnEdge) alien.changeDirection();
                alien.move();
            });
            this.moveAliens = !this.moveAliens;
        }
    }

    restartInterval() {
        this.timeToMove = this.calcIntervalTime(); 
        clearInterval(this.moveInterval);
        this.moveInterval = this.setMoveInterval();
    }

    calcIntervalTime() {
        const calculatedTime = Math.floor(this.aliens.length / 10) * 200;
        return calculatedTime === 0 ? 100 : calculatedTime; 
    }

    isAnyAlienOnEdge() {
        return this.aliens.some(alien => {
            return alien.position.x <= 0 ||
                alien.position.x >= (this.game.gameWidth - alien.size);
        });
    }
}
