import { AnimatedSprite, Container, Graphics, Loader, Sprite, Texture } from "../../lib/pixi.mjs";
import { SoundManager } from "./SoundManager";

export class Test extends Container {
    constructor() {
        super();
        this.init();
    }

    init() {
       // this.initSorting();
        //this.sprites();
       // this.loader();
        //this.initAnimatedSprite();
        //this.initMask();
       // this.initFilter();
        //this.initHitArea();
        this.initPromise();
        SoundManager.getInstance().play("start")
    }

    initSorting() {
        const fruits = ["banana", "strawberry", "cherry", "watermelon", "apple", "orange"];
        fruits.sort();
        console.log(fruits);

        const numbers = [4, 5, 2, 1, 3, 9, 8];
        numbers.sort(function(a, b) {
            return a-b;
        });
        console.log(numbers);
    }


    sprites() {
        const star = Sprite.from("assets/star.png");
        star.tint = 0x00ff00;
        this.addChild(star);
        star.interactive = true;
        //star.on("click", function(event) {
        star.on("click", function(event) {
            console.log("MouseClick position X = " + event.data.global.x + " Y = " + event.data.global.y );
        });

        //star.scale.x = 2;
        //star.scale.y = 0.5;
        //star.scale.set(2);

        const container = new Container();
        this.addChild(container);
    }

    loader() {
        const loader = new Loader();
        loader.add("enemy1", "assets/Enemy_1.png");
        loader.add("enemy2", "assets/Enemy_2.png");
        loader.add("enemy3", "assets/Enemy_3.png");
        loader.load((loader, resources) => {
           const enemy1 = new Sprite(resources.enemy1.texture);
            const enemy2 = new Sprite(resources.enemy2.texture);
            const enemy3 = new Sprite(resources.enemy3.texture);
            enemy1.x = 400;
            enemy1.y = 400;
            enemy2.x = 500;
            enemy3.x = 600;
            this.addChild(enemy1);
            this.addChild(enemy2);
            this.addChild(enemy3);

            enemy1.anchor.set(0.5)  
            
            enemy1.pivot.set( 500, 500);
        });
    }

    initAnimatedSprite() {
        let textures = [];
        let texture = null;
        const name = "assets/Enemy_";
        for(let i = 1; i < 8; i++) {
            texture = new Texture.from(name + i + ".png");
            textures.push(texture);
        }

        let animatedSprite = new AnimatedSprite(textures);
        animatedSprite.animatedSpeed = 0.1;
        animatedSprite.loop = true;
        animatedSprite.x = 700;
        animatedSprite.y = 0;
        this.addChild(animatedSprite);
        animatedSprite.play();
    }

    initMask() {
        const sprite = Sprite.from("assets/star.png");
        sprite.x = 400;
        sprite.y = 400;
        container.addChild(sprite);
        this.addChild(container);

        let mask = new Graphics();
        mask.beginFill(0x00ff00, 1);
        mask.drawRect(0, 0, 200, 200);
        mask.endFill();
        mask.x = 80;
        mask.y = 80;
        sprite.addChild(mask);
        sprite.mask = mask;
    }

    initFilter() {
        const container = new Container();

        const sprite = Sprite.from("assets/star.png");
        sprite.x = 400;
        sprite.y = 400;
        container.addChild(sprite);
        this.addChild(container);

       // let glow = new GlowFilter({ distance: 15, outerStrength: 2 })
       // container.filter = [glow];
    }

    initHitArea() {
        const container = new Container();
        const star = Sprite.from("assets/star.png");
        container.addChild(star);
        this.addChild(container);
        container.x = 100;
        container.y = 100;
        container.interactive = true;
        //container.visible = false;
        container.alpha = 0.01;
        container.buttonMode = true;
        container.on("mouseover", function() {
            console.log("mouseover");
        })
    }

    initPromise() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = true;
                if(result) {
                    resolve();
                } else {
                    reject();
                }
            }, 1000);
        })

        promise.then( 
            function(data){
                console.log(data);
            },
            function(error){
                console.log(error)
            } )

        return promise;
    }

    initMap() {
        const users = new Map();
        users.set('Alice', 25);
        users.set('Bob', 30);
        users.set('Charlie', 35);

        console.log(users.get('Alice'));
        console.log(users.has('Bob'));
        users.delete('Charlie');
        users.forEach((age, name) => {
            console.log(`${name} is ${age} years old`);
        });
    }

    initRequestAnimationFrame() {
        function animate() {
            this.object.x +=1;
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }
}   