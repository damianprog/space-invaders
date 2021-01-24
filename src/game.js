import SpaceShip from "/src/spaceShip.js";
import Input from "/src/input.js";
import Alien from "/src/alien.js";
import Position from "/src/position.js";
import Motherboard from "/src/motherboard.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.spaceShip = new SpaceShip(this);
        this.aliens = this.createAliens();
        this.motherboard = new Motherboard(this,this.aliens);
        this.inputHandler = new Input(this.spaceShip, this);
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

    draw(ctx) {
        this.spaceShip.draw(ctx);
        this.motherboard.draw(ctx);
    }

    update(deltaTime) {
        this.spaceShip.update(deltaTime);
        this.motherboard.update();
    }

    clear(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }
}