import { Container, Graphics, Point } from "../../lib/pixi.mjs";
import { Game } from "./Game.js";

export class Enemy extends Container {
    static ENEMY_COLOR = 0xffff00;
    static ENEMY_RADIUS = 50;
    static ENEMY_SPEED = 20;

    constructor() {
        super();
        this._speed = Enemy.ENEMY_SPEED;
        this._graphics = null;
        this._endPosition = null;
        this._isCanRemoving = false;

        this.initBackground();
        this.updatePositions();
    }

    initBackground() {
        this._graphics = new Graphics();
        this._graphics.beginFill(Enemy.ENEMY_COLOR, 1);
        this._graphics.drawStar(0, 0, 5, Enemy.ENEMY_RADIUS, 20);
        this._graphics.endFill();
        this.addChild(this._graphics);
    }

    move(delta) {
        const dx = this._endPosition.x - this.x;
        const dy = this._endPosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > Enemy.ENEMY_RADIUS) {
            this.x += (dx / distance) * this._speed * delta;
            this.y += (dy / distance) * this._speed * delta;
        } else {
            this.updatePositions();
        }
    }

    updatePositions() {
        const newStartPosition = this.getRandomStartPosition();
        this.x = newStartPosition.x;
        this.y = newStartPosition.y;
        this._endPosition = this.getRandomEndPosition();
    }

    getRandomStartPosition() {
        return new Point(Math.round(Math.random() * Game.GAME_WIDTH), - Enemy.ENEMY_RADIUS);
    }

    getRandomEndPosition() {
        return new Point(Math.round(Math.random() * Game.GAME_WIDTH), Game.GAME_HEIGHT + Enemy.ENEMY_RADIUS * 2);
    }

    getIsCanRemoving() {return this._isCanRemoving;}
    setIsCanRemoving(value) {this._isCanRemoving = value;}
}