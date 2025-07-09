export class SoundManager {
    static instance = null;

    static getInstance() {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    play() {
        console.log("play");
    }
}