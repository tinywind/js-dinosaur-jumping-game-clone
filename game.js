import {setupGround, updateGround} from './ground.js';
import {getRect as getDinoRect, setLose, setupDino, updateDino} from "./dino.js";
import {clearCactuses, getRects as getCactusRects, setupCactus, updateCactus} from "./cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_INCREMENT = 0.00001;
const INITIAL_SPEED = 0.6;

const worldElement = document.getElementById('world');
const startScreen = document.getElementById('start-screen');
const scoreElement = document.getElementById('score');

function setup() {
    setupGround();
    setupDino();
    setupCactus();
    setPixelToWorldScale();
}

setup();

window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
        startGame();
    } else if (e.code === 'ArrowRight') {
        speed += 0.1;
    } else if (e.code === 'ArrowUp') {
    }
})

function setPixelToWorldScale() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width / height < WORLD_WIDTH / WORLD_HEIGHT) {
        const scale = width / WORLD_WIDTH;
        worldElement.style.width = `${WORLD_WIDTH * scale}px`
        worldElement.style.height = `${WORLD_HEIGHT * scale}px`
    } else {
        const scale = height / WORLD_HEIGHT;
        worldElement.style.width = `${WORLD_WIDTH * scale}px`
        worldElement.style.height = `${WORLD_HEIGHT * scale}px`
    }
}

let lastTime, started = false, speed = 0, score = 0;

function update(time) {
    if (!lastTime) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return
    }

    if (started) {
        const delta = time - lastTime;
        if (delta) {
            updateGround(delta, speed += SPEED_INCREMENT * delta);
            updateDino(delta, speed);
            updateCactus(delta, speed);
            updateScore(delta);

            if (isCollided())
                endGame();
        }
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

function startGame() {
    if (started) return;

    setup();
    started = true;
    speed = INITIAL_SPEED;
    score = 0;
    lastTime = 0;
    startScreen.classList.add('hidden');
    window.requestAnimationFrame(update);
}

function endGame() {
    started = false;
    startScreen.classList.remove('hidden');
    // scoreElement.classList.add('hidden');
    speed = 0;
    setLose();
}

function updateScore(delta) {
    scoreElement.classList.remove('hidden');
    scoreElement.textContent = "" + (score += Math.floor(delta * speed));
}

function isCollided() {
    const dinoRect = getDinoRect();
    const cactusRects = getCactusRects();

    function isColliding(r1, r2) {
        return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
    }

    for (let i = 0; i < cactusRects.length; i++) {
        if (isColliding(dinoRect, cactusRects[i])) {
            return true;
        }
    }

    return false;
}
