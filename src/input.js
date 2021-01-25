import Game from "/src/game.js";
import SpaceShip from "/src/spaceShip.js";

export default class Input {
    constructor(spaceShip, game) {
        this.spaceShip = spaceShip;
        this.game = game;
        document.addEventListener("keydown", event => {
            switch(event.key) {
                case "ArrowLeft":
                    this.spaceShip.moveLeft();
                    break;

                case "ArrowRight":
                    this.spaceShip.moveRight();
                    break;

                case "c":
                    this.game.createMissile();
            }
        });  
        
        document.addEventListener("keyup", event => {
            switch(event.key) {
                case "ArrowLeft":
                    if (this.spaceShip.speed < 0) this.spaceShip.stop();
                    break;

                case "ArrowRight":
                    if (this.spaceShip.speed > 0) this.spaceShip.stop();
                    break;
            }
        });
    }
}
