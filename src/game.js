import SpaceShip from "/src/spaceShip.js";
import Input from "/src/input.js";
import Alien from "/src/alien.js";
import Position from "/src/position.js";
import Motherboard from "/src/motherboard.js";
import Missile from "/src/missile.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.spaceShip = new SpaceShip(this);
        this.motherboard = new Motherboard(this, this.createAliens());
        this.inputHandler = new Input(this.spaceShip, this);
        this.spaceShipMissile = null;
        this.alienMissiles = [];
        this.setAlienMissilesInterval();
    }

    createAliens() {
        const aliens = [];
        for (let i = 0; i < 55; i++) {
            let alienType = "a";
            if (i > 10 && i < 33) alienType = "b";
            if (i >= 33 && i < 55) alienType = "c";

            const row = Math.floor(i / 11);
            const col = i % 11;
            const alienPosition = new Position(100 + (col * 37), 30 + (row * 37));

            aliens.push(new Alien(this, alienType, alienPosition));
        }
        return aliens;
    }

    setAlienMissilesInterval() {
        setInterval(() => {
            if (this.motherboard.aliens.length > 0) {
                const aliensPositions = this.motherboard.aliens.map(alien => new Position(alien.position.x, alien.position.y));
                const missilesQty = Math.floor(Math.random() * 4);
                for (let i = 1; i <= missilesQty && aliensPositions.length > 0; i++) {
                    const randomPositionIndex = Math.floor(Math.random() * aliensPositions.length);
                    const randomPosition = aliensPositions[randomPositionIndex];
                    this.alienMissiles.push(new Missile(this,randomPosition, true));
                    aliensPositions.splice(randomPositionIndex, 1);
                }
            }
        }, 1000);
    }

    createMissile() {
        const missilePosition = new Position(this.spaceShip.position.x + 10, this.spaceShip.position.y);
        if (!this.spaceShipMissile) {
            this.spaceShipMissile = new Missile(this, missilePosition);
            new Audio("/assets/sounds/laser_shoot2.wav").play();
        }
    }

    draw(ctx) {
        this.spaceShip.draw(ctx);
        this.motherboard.draw(ctx);
        if (this.spaceShipMissile) this.spaceShipMissile.draw(ctx);
        this.alienMissiles.forEach(missile => missile.draw(ctx));
    }

    update(deltaTime) {
        this.spaceShip.update(deltaTime);
        this.motherboard.update(deltaTime);
        if (this.spaceShipMissile) {
            this.spaceShipMissile.update(deltaTime);
            if (this.spaceShipMissile.position.y < 0) this.spaceShipMissile = null;
        }

        this.alienMissiles.forEach(missile => missile.update(deltaTime));
        this.alienMissiles = this.alienMissiles.filter(missile => missile.position.y < 550);
    }

    clear(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }
}
