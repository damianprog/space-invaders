import GAME_STATE from "/src/gameStates.js";
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
        this.gameState = GAME_STATE.RUNNING;
        this.initializeQuantities();
        this.initializeDefaults();
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
            if (this.motherboard.aliens.length > 0 && this.gameState === GAME_STATE.RUNNING) {
                const aliensPositions = this.getAliensPositions();
                const missilesQty = Math.floor(Math.random() * 4);
                for (let i = 1; i <= missilesQty && aliensPositions.length > 0; i++) {
                    const randomPositionIndex = Math.floor(Math.random() * aliensPositions.length);
                    const randomPosition = aliensPositions[randomPositionIndex];
                    this.missiles.push(new Missile(this,randomPosition));
                    aliensPositions.splice(randomPositionIndex, 1);
                }
            }
        }, 1000);
    }

    getAliensPositions() {
        return this.motherboard.aliens
            .map(alien => new Position(alien.position.x, alien.position.y))
    }

    initializeQuantities() {
        this.livesQty = document.querySelector(".lives-qty");
        this.scoreQty = document.querySelector(".score-qty");
    }

    initializeDefaults() {
        this.spaceShip = new SpaceShip(this);
        this.inputHandler = new Input(this.spaceShip, this);
        this.motherboard = new Motherboard(this, this.createAliens());
        this.missiles = [];
        this.livesQty.innerHTML = 3;
        this.scoreQty.innerHTML = 0;
    }

    start() {
        if (this.gameState === GAME_STATE.WELCOME_MENU || this.gameState === GAME_STATE.GAMEOVER) {
            this.initializeDefaults();
            this.gameState = GAME_STATE.RUNNING;
        }
    }

    createMissile() {
        const missilePosition = new Position(this.spaceShip.position.x + 10, this.spaceShip.position.y);
        if (!this.getSpaceShipMissile()) {
            this.missiles.push(new Missile(this, missilePosition, true));
            new Audio("/assets/sounds/laser_shoot2.wav").play();
        }
    }

    getSpaceShipMissile() {
        return this.missiles.find(missile => missile.isSpaceShipMissile);
    }

    onSpaceShipCollision() {
        this.livesQty.innerHTML = parseInt(this.livesQty.innerHTML) - 1;
        const currentScore = parseInt(this.scoreQty.innerHTML);
        this.scoreQty.innerHTML = currentScore >= 300 ? currentScore - 300 : 0;
    }

    onAlienCollision() {
        this.scoreQty.innerHTML = parseInt(this.scoreQty.innerHTML) + 100;
    }

    draw(ctx) {
        this.spaceShip.draw(ctx);
        this.motherboard.draw(ctx);
        this.missiles.forEach(missile => missile.draw(ctx));
    
        if (this.gameState === GAME_STATE.GAMEOVER) {
            this.darkenBackground(ctx);
            this.setFontStyle(ctx);
            ctx.fillText("Game Over!", this.gameWidth / 2, (this.gameHeight / 2) - 150);
            ctx.fillText("Your Score: " + this.scoreQty.innerHTML, this.gameWidth / 2, (this.gameHeight / 2) - 50 );
            ctx.fillText("Press SPACEBAR to restart", this.gameWidth / 2, (this.gameHeight / 2));
        }
    }

    darkenBackground(ctx) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
    }

    setFontStyle(ctx) {
        ctx.font = "20px PressStart2P";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
    }

    update(deltaTime) {
        if (this.gameState === GAME_STATE.GAMEOVER) return;
        this.spaceShip.update(deltaTime);
        this.motherboard.update(deltaTime);
        this.missiles.forEach(missile => missile.update(deltaTime));
        this.missiles = this.missiles.filter(missile => !missile.markedForRemoval);
        if(parseInt(this.livesQty.innerHTML) === 0 ||
            this.motherboard.aliens.length === 0) this.gameState = GAME_STATE.GAMEOVER;
    }

    clear(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }
}
