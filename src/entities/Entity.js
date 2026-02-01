import * as THREE from 'three';

/**
 * Base Entity class - All game objects inherit from this
 */
export class Entity {
    constructor(engine) {
        this.engine = engine;
        this.mesh = null;
        this.position = new THREE.Vector3();
        this.rotation = new THREE.Euler();
        this.scale = new THREE.Vector3(1, 1, 1);
        this.velocity = new THREE.Vector3();
    }
    
    /**
     * Initialize the entity (override in subclasses)
     */
    init() {
        // To be implemented by subclasses
    }
    
    /**
     * Update the entity each frame (override in subclasses)
     */
    update(deltaTime) {
        // Apply velocity
        if (this.mesh) {
            this.mesh.position.add(
                this.velocity.clone().multiplyScalar(deltaTime)
            );
        }
    }
    
    /**
     * Set position
     */
    setPosition(x, y, z) {
        this.position.set(x, y, z);
        if (this.mesh) {
            this.mesh.position.copy(this.position);
        }
    }
    
    /**
     * Set rotation
     */
    setRotation(x, y, z) {
        this.rotation.set(x, y, z);
        if (this.mesh) {
            this.mesh.rotation.copy(this.rotation);
        }
    }
    
    /**
     * Set scale
     */
    setScale(x, y, z) {
        this.scale.set(x, y, z);
        if (this.mesh) {
            this.mesh.scale.copy(this.scale);
        }
    }
    
    /**
     * Cleanup the entity
     */
    destroy() {
        if (this.mesh) {
            if (this.mesh.geometry) this.mesh.geometry.dispose();
            if (this.mesh.material) {
                if (Array.isArray(this.mesh.material)) {
                    this.mesh.material.forEach(mat => mat.dispose());
                } else {
                    this.mesh.material.dispose();
                }
            }
        }
    }
}
