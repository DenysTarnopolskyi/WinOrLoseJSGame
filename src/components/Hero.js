import { Container, Graphics } from "../../lib/pixi.mjs";

export class Hero extends Container {
    static HERO_COLLISION_DISTANCE = 50;
    static HERO_COLOR = 0x000066;
    static HERO_RADIUS = 40;

    constructor() {
        super();
        this._graphics = null;
        this.initBackground();
    }

    initBackground() {
        this._graphics = new Graphics();
        this._graphics.beginFill(Hero.HERO_COLOR);
        this._graphics.drawCircle(0, 0, Hero.HERO_RADIUS);
        this._graphics.endFill();
        this.addChild(this._graphics);
    }

    updateHeroPosition(position, gameWidth, gameHeight) {
        this.x = position.x;
        this.y = position.y;

        if(this.x < 0) {
            this.x = 0;
        }
        if(this.y < 0) {
            this.y = 0;
        }
        if(this.x > gameWidth) {
            this.x = gameWidth;
        }
        if(this.y > gameHeight) {
            this.y = gameHeight;
        }
    }

    checkHitTestHeroWithEnemy(animalX, animalY) {
        const dx = this.x - animalX;
        const dy = this.y - animalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < Hero.HERO_COLLISION_DISTANCE;
    }
}