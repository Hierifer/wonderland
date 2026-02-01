/**
 * Input Manager - Handles keyboard and mouse input
 */
export class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            deltaX: 0,
            deltaY: 0,
            isLocked: false,
            buttons: {}
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard events
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Mouse movement
        window.addEventListener('mousemove', (e) => {
            if (this.mouse.isLocked) {
                this.mouse.deltaX = e.movementX || 0;
                this.mouse.deltaY = e.movementY || 0;
            }
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Mouse buttons
        window.addEventListener('mousedown', (e) => {
            this.mouse.buttons[e.button] = true;
        });
        
        window.addEventListener('mouseup', (e) => {
            this.mouse.buttons[e.button] = false;
        });
        
        // Pointer lock for FPS-style controls
        document.addEventListener('click', () => {
            if (!this.mouse.isLocked) {
                document.body.requestPointerLock();
            }
        });
        
        document.addEventListener('pointerlockchange', () => {
            this.mouse.isLocked = document.pointerLockElement === document.body;
        });
    }
    
    /**
     * Check if a key is currently pressed
     */
    isKeyPressed(keyCode) {
        return this.keys[keyCode] === true;
    }
    
    /**
     * Check if a mouse button is pressed
     */
    isMouseButtonPressed(button = 0) {
        return this.mouse.buttons[button] === true;
    }
    
    /**
     * Get mouse position
     */
    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }
    
    /**
     * Get mouse delta (movement since last frame)
     */
    getMouseDelta() {
        const delta = { x: this.mouse.deltaX, y: this.mouse.deltaY };
        // Reset delta after reading
        this.mouse.deltaX = 0;
        this.mouse.deltaY = 0;
        return delta;
    }
    
    /**
     * Check if pointer is locked
     */
    isPointerLocked() {
        return this.mouse.isLocked;
    }
}
