import { Container, Graphics, Point, Text } from "../../lib/pixi.mjs";
import { Game } from "./Game.js";

export class ProgressBar extends Container {
    static BAR_TEXT = " sec left";
    static MESSAGE_TEXT = "Press to Start a New Round!";
    static SECONDS_IN_MINUTE = 60;
    static GAME_TOTAL_TIME = 20;
    static GAME_COLOR = 0x9900cc;
    static GAME_WIDTH = 1000;
    static GAME_HEIGHT = 40;

    constructor() {
        super();
        this._graphics = null;
        this._timeTextField = null;
        this._messageTextField = null;
        this._leftTime = 0;
        this._elapsedTime = 0;
        this._progress = 1;
        this._finishedCallback = null;

        this.initBackground();
        this.initTimeTextField();
        this.initGameMessageTextField();
        this.reset();
    }

    initBackground() {
        this._graphics = new Graphics();
        this._graphics.beginFill(ProgressBar.GAME_COLOR);
        this._graphics.drawRect(0, 0, ProgressBar.GAME_WIDTH, ProgressBar.GAME_HEIGHT);
        this._graphics.endFill();
        this.addChild(this._graphics);
    }

    initTimeTextField() {
        this._timeTextField = new Text("", this.getFontStyle());
        this._timeTextField.x = (this._graphics.width) * 0.5;
        this.addChild(this._timeTextField);
    }

    initGameMessageTextField() {
        this._messageTextField = new Text(ProgressBar.MESSAGE_TEXT, this.getFontStyle());
        this._messageTextField.x = (this._graphics.width - this._messageTextField.width) * 0.5 + 100;
        this._messageTextField.y = - 60;
        this.addChild(this._messageTextField);
    }
    
    reset() {
        this._progress = 1;
        this._elapsedTime = 0;
        this._leftTime = 0;
        this._graphics.width = ProgressBar.GAME_WIDTH;
        this.updateMessageTextFieldVisible(false);
    }

    update(delta, fps, deltaMS) {
        if(!this._graphics.width) {
            return;
        }

        this._elapsedTime += delta / ProgressBar.SECONDS_IN_MINUTE / ProgressBar.GAME_TOTAL_TIME;
        if (this._elapsedTime < 1) {
            this._progress = (1 - this._elapsedTime);
            this._graphics.width = ProgressBar.GAME_WIDTH * this._progress;
            var leftTime = (ProgressBar.GAME_TOTAL_TIME * this._progress).toFixed();
            this.updateTimeText(leftTime);
        } else {
            this._graphics.width = 0;
            this.updateMessageTextFieldVisible(true);
            this._finishedCallback && this._finishedCallback(); 
        }
    }

    updateTimeText(time) {
        if(this._leftTime !== time) {
            this._leftTime = time;
            this._timeTextField.text = (this._leftTime + ProgressBar.BAR_TEXT).toString();
            console.log("time = " + this._leftTime);
        }
    }

    updateMessageTextFieldVisible(value) {
        if(this._messageTextField.visible !== value) {
            this._messageTextField.visible = value;
        }
    }

    setFinishedCallback(value) {
        this._finishedCallback = value;
    }

    getFontStyle() {
        return {fontFamily : 'Arial', fontSize: 36, fill : 0xffff00, align : 'center'};
    }
}