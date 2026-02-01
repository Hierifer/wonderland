import * as THREE from 'three';
import { Entity } from './Entity.js';

/**
 * Player Entity - First-person camera controller
 */
export class Player extends Entity {
    constructor(engine) {
        super(engine);
        
        this.moveSpeed = 10;
        this.lookSpeed = 0.002;
        this.jumpForce = 5;
        this.gravity = -20;
        
        this.isGrounded = false;
        this.verticalVelocity = 0;
        
        this.init();
    }
    
    init() {
        // Use the engine's camera for first-person view
        this.camera = this.engine.camera;
        this.position.copy(this.camera.position);
    }
    
    update(deltaTime) {
        const input = this.engine.getInput();
        
        // Mouse look (only when pointer is locked)
        if (input.isPointerLocked()) {
            const mouseDelta = input.getMouseDelta();
            
            // Rotate camera based on mouse movement
            this.camera.rotation.y -= mouseDelta.x * this.lookSpeed;
            this.camera.rotation.x -= mouseDelta.y * this.lookSpeed;
            
            // Clamp vertical rotation
            this.camera.rotation.x = Math.max(
                -Math.PI / 2,
                Math.min(Math.PI / 2, this.camera.rotation.x)
            );
        }
        
        // Movement
        const moveVector = new THREE.Vector3();
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        
        // Get forward and right vectors based on camera rotation
        this.camera.getWorldDirection(forward);
        forward.y = 0; // Keep movement on horizontal plane
        forward.normalize();
        
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
        
        // WASD movement
        if (input.isKeyPressed('KeyW')) {
            moveVector.add(forward);
        }
        if (input.isKeyPressed('KeyS')) {
            moveVector.sub(forward);
        }
        if (input.isKeyPressed('KeyA')) {
            moveVector.sub(right);
        }
        if (input.isKeyPressed('KeyD')) {
            moveVector.add(right);
        }
        
        // Normalize diagonal movement
        if (moveVector.length() > 0) {
            moveVector.normalize();
        }
        
        // Apply movement
        this.camera.position.x += moveVector.x * this.moveSpeed * deltaTime;
        this.camera.position.z += moveVector.z * this.moveSpeed * deltaTime;
        
        // Simple ground check (assuming ground is at y=1.6)
        const groundHeight = 1.6;
        this.isGrounded = this.camera.position.y <= groundHeight;
        
        // Jumping
        if (input.isKeyPressed('Space') && this.isGrounded) {
            this.verticalVelocity = this.jumpForce;
        }
        
        // Apply gravity
        if (!this.isGrounded || this.verticalVelocity > 0) {
            this.verticalVelocity += this.gravity * deltaTime;
            this.camera.position.y += this.verticalVelocity * deltaTime;
            
            // Prevent falling through ground
            if (this.camera.position.y < groundHeight) {
                this.camera.position.y = groundHeight;
                this.verticalVelocity = 0;
                this.isGrounded = true;
            }
        }
    }
}
