import { Application, autoDetectRenderer } from "../lib/pixi.mjs";
import { Game } from "./components/Game.js";
import { Test } from "./tests/Test.js";

const app = new Application({
    width: 1600,
    height: 1400,
    backgroundColor: 0xc2c2c2,
    view: document.getElementById("canvas"),
});
globalThis.__PIXI_APP__ = app;  

const runGame = () => {
    const game = new Game();
    game.x = 0;
    game.y = 0;
    app.stage.addChild(game);
    app.stage.interactive = true;
    app.stage.interactiveChildren = true;
    app.ticker.maxFPS = 60;
    const fps = app.ticker.FPS;

    app.ticker.add((delta, fps, deltaMS) => {
        game.onAppTickerUpdate(delta, fps, deltaMS);
    });

    app.stage.on('mousemove', (event) => {
        game.onMouseMove(event);
    });

    app.stage.on('pointerdown', (event) => {
        game.onMouseDown(event);
    });

   // app.render = new autoDetectRenderer();
   // app.render = new CanvasRenderingContext2D();
   // app.render = new WebGLRenderingContext();
};

//assetsMap.sprites.forEach((value) => app.loader.add(value.name, value.url));
//app.loader.load(runGame);


const runTest = () => {
    const test = new Test();
    app.stage.addChild(test);
}
app.loader.load(runTest);