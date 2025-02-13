import { Container, Graphics } from "../../lib/pixi.mjs";
import { Enemy } from "./Enemy.js";
import { Hero } from "./Hero.js";
import { ProgressBar } from "./ProgressBar.js";

export class Game extends Container {
    static GAME_COLOR = 0x000000;
    static GAME_WIDTH = 1600;
    static GAME_HEIGHT = 1400;
    static MAX_ENEMY_COUNT = 5;

    constructor() {
        super();
        this._graphics = null;
        this._hero = null;
        this._progressBar = null;
        this._isFinishedGame = false;
        this._enemies = [];

        this.initBackground();
        this.initGameElements();
        this.initEnemies();
    }

    initBackground() {
        this._graphics = new Graphics();
        this._graphics.beginFill(Game.GAME_COLOR);
        this._graphics.drawRect(0, 0, Game.GAME_WIDTH, Game.GAME_HEIGHT);
        this._graphics.endFill();
        this.addChild(this._graphics);
    }

    initGameElements() {
        this._progressBar = new ProgressBar();
        this._progressBar.setFinishedCallback(this.onTimeFinished.bind(this));
        this._progressBar.x = 200;
        this._progressBar.y = 1100;
        this.addChild(this._progressBar);

        this._hero = new Hero();
        this._hero.x = 300;
        this._hero.y = 600;
        this.addChild(this._hero);

        this._enemy = new Enemy();
        this.addChild(this._enemy);
        this._enemies.push(this._enemy);
    }

    initEnemies() {
        const count = Game.MAX_ENEMY_COUNT;
        var enemy = null;
        for (let i = 0; i < count; i++) {
            enemy = new Enemy();
            this.addChild(enemy);
            this._enemies.push(enemy);
        }
    }

    onMouseMove(event) {
        this._hero.updateHeroPosition(event.data.global, Game.GAME_WIDTH, Game.GAME_HEIGHT);
    }

    onMouseDown(event) {
        if(this._isFinishedGame) {
            this._progressBar.reset();
            this._hero.x = 300;
            this._hero.y = 600;
            this.initEnemies();
            this._isFinishedGame = false;
        }
    }

    onAppTickerUpdate(delta, fps, deltaMS) {
        if(this._isFinishedGame) {
            this._progressBar.updateMessageTextFieldVisible(true);
        } else {
            this.moveEnemies(delta);
            this.checkRemoveEnemies();
            this._progressBar.update(delta, fps, deltaMS);
            this.checkCatchAllEnemy(); 
        }
    }

    moveEnemies(delta) {
        var enemy = null;
        var isHeroHitTestWithEnemy = false;
        for (let i = 0; i < this._enemies.length; i++) {
            enemy = this._enemies[i];
            enemy.move(delta);

            isHeroHitTestWithEnemy = this._hero.checkHitTestHeroWithEnemy(enemy.x, enemy.y);
            enemy.setIsCanRemoving(isHeroHitTestWithEnemy);
        }
    }

    onTimeFinished() {
        this.removeAllEnemy();
        this._isFinishedGame = true;
    }

    checkCatchAllEnemy() {
        if(!this._enemies.length) {
            this._isFinishedGame = true;
        }
    }

    checkRemoveEnemies() {
        var enemy = null;
        for (var i = this._enemies.length - 1; i >= 0; i--) {
            enemy = this._enemies[i];
            if(enemy.getIsCanRemoving()) {
                this.removeEnemy(enemy, i);
            }
        }
    }

    removeAllEnemy() {
        var enemy = null;
        for (var i = this._enemies.length - 1; i >= 0; i--) {
            enemy = this._enemies[i];
            this.removeEnemy(enemy, i);
        }
    }

    removeEnemy(enemy, index) {
        this._enemies.splice(index, 1);
        this.removeChild(enemy);
        enemy = null;
    }
}