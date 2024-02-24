import {getCustomProperty, incrementCustomProperty, setCustomProperty} from "./updateCustomProperty.js";

const dinoElement = document.getElementById('dino')
const JUMP_SPEED = 0.5;
const GRAVITY = 0.002;
const DINO_FRAME_COUNT = 2;
const FRAME_DURATION = 100;

let isJumping, yVelocity, currentFrameTime, currentFrame;

export function setupDino() {
    isJumping = false;
    yVelocity = 0;
    currentFrameTime = 0;
    currentFrame = 0;
    setCustomProperty(dinoElement, '--bottom', 0)

    dinoElement.src = 'images/dino-stationary.png'
    document.addEventListener('keydown', e => {
        if (e.code === 'Space') {
            jump()
        }
    })
}

export function updateDino(delta, speed) {
    if (isJumping) {
        dinoElement.src = 'images/dino-stationary.png'

        incrementCustomProperty(dinoElement, '--bottom', yVelocity * delta)
        if (getCustomProperty(dinoElement, '--bottom') <= 0) {
            isJumping = false
            currentFrameTime = 0
            setCustomProperty(dinoElement, '--bottom', 0)
        }

        yVelocity -= GRAVITY * delta
    } else {
        if (currentFrameTime > FRAME_DURATION) {
            currentFrame = (currentFrame + 1) % DINO_FRAME_COUNT
            dinoElement.src = `images/dino-run-${currentFrame}.png`
            currentFrameTime = 0
        } else {
            currentFrameTime += delta * speed
        }
    }
}

export function getRect() {
    return dinoElement.getBoundingClientRect()
}

export function setLose() {
    dinoElement.src = 'images/dino-lose.png'
}

function jump() {
    if (!isJumping) {
        isJumping = true
        yVelocity = JUMP_SPEED
    }
}
