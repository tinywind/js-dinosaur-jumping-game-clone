import {getCustomProperty, setCustomProperty} from "./updateCustomProperty.js";

const SPEED = 0.05;
const WORLD_WIDTH = 100;
const INTERVAL_MIN = 500;
const INTERVAL_MAX = 2000;
const world = document.getElementById('world');

let nextCactusTime, index;

export function setupCactus() {
    clearCactuses();
    nextCactusTime = 0;
    index = 0;
}

export function updateCactus(delta, speedMultiplier = 1) {
    document.querySelectorAll('.cactus').forEach(e => {
        const left = getCustomProperty(e, '--left');
        if (left > -WORLD_WIDTH) {
            setCustomProperty(e, '--left', left - delta * SPEED * speedMultiplier)
        } else {
            e.remove();
        }
    });

    if (nextCactusTime <= 0) {
        createCactus();
        nextCactusTime = (Math.random() * (INTERVAL_MAX - INTERVAL_MIN) + INTERVAL_MIN) / speedMultiplier;
    }
    nextCactusTime -= delta;
}

export function getRects() {
    return Array.from(document.querySelectorAll('.cactus')).map(e => {
        let rect = e.getBoundingClientRect();
        const nonCaughtArea = rect.width / 4;
        return {
            x: rect.x + nonCaughtArea,
            y: rect.y,
            width: rect.width - 2 * nonCaughtArea,
            height: rect.height,
            left: rect.left + nonCaughtArea,
            right: rect.right - nonCaughtArea,
            top: rect.top,
            bottom: rect.bottom
        };
    });

    // return Array.from(document.querySelectorAll('.cactus')).map(e => e.getBoundingClientRect());
}

export function clearCactuses() {
    document.querySelectorAll('.cactus').forEach(e => e.remove());
}

function createCactus() {
    const cactus = document.createElement('img');
    cactus.dataset.cactus = true;
    cactus.src = 'images/cactus.png';
    cactus.classList.add('cactus');
    cactus.setAttribute('data-index', "" + index++);
    setCustomProperty(cactus, '--left', 100);
    world.appendChild(cactus);

    return cactus;
}
