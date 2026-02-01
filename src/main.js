import { GameEngine } from './engine/GameEngine.js';
import { ExampleScene } from './scenes/ExampleScene.js';

// Initialize the game engine
const engine = new GameEngine({
    container: document.getElementById('canvas-container'),
    enablePhysics: false // Can be extended with physics engine later
});

// Create and load example scene
const scene = new ExampleScene(engine);
engine.loadScene(scene);

// Start the engine
engine.start();

// FPS Counter
let lastTime = performance.now();
let frames = 0;
const fpsElement = document.getElementById('fps');

function updateFPS() {
    frames++;
    const currentTime = performance.now();
    if (currentTime >= lastTime + 1000) {
        fpsElement.textContent = `FPS: ${frames}`;
        frames = 0;
        lastTime = currentTime;
    }
    requestAnimationFrame(updateFPS);
}
updateFPS();

// Make engine globally accessible for debugging
window.engine = engine;
