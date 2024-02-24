import {getCustomProperty, incrementCustomProperty, setCustomProperty} from "./updateCustomProperty.js";

const SPEED = 0.05;
const WORLD_WIDTH = 100;
const groundElements = document.querySelectorAll('[data-ground]')

export function setupGround() {
    setCustomProperty(groundElements[0], '--left', 0)
    setCustomProperty(groundElements[1], '--left', WORLD_WIDTH)
}

export function updateGround(delta, speedMultiplier = 1) {
    groundElements.forEach(e => {
        const left = getCustomProperty(e, '--left');
        if (left > -WORLD_WIDTH) {
            incrementCustomProperty(e, '--left', delta * SPEED * speedMultiplier * -1)
        } else {
            setCustomProperty(e, '--left', WORLD_WIDTH)
        }
    })

    for (let i = 0; i < groundElements.length; i++) {
        const left = getCustomProperty(groundElements[i], '--left');
        if (left <= -WORLD_WIDTH) {
            const othersLeft = getCustomProperty(groundElements[i === 0 ? 1 : 0], '--left');
            setCustomProperty(groundElements[i], '--left', othersLeft + WORLD_WIDTH)
        }
    }
}
