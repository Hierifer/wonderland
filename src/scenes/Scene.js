/**
 * Base Scene class - All game scenes inherit from this
 */
export class Scene {
    constructor(engine) {
        this.engine = engine;
        this.entities = [];
    }
    
    /**
     * Load the scene (override in subclasses)
     */
    load() {
        console.log('Loading scene:', this.constructor.name);
    }
    
    /**
     * Update the scene each frame (override in subclasses)
     */
    update(deltaTime) {
        // Update all scene-specific entities
        for (const entity of this.entities) {
            if (entity.update) {
                entity.update(deltaTime);
            }
        }
    }
    
    /**
     * Add an entity to this scene
     */
    addEntity(entity) {
        this.entities.push(entity);
        this.engine.addEntity(entity);
    }
    
    /**
     * Remove an entity from this scene
     */
    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
        this.engine.removeEntity(entity);
    }
    
    /**
     * Cleanup the scene
     */
    cleanup() {
        // Remove all entities
        for (const entity of this.entities) {
            this.engine.removeEntity(entity);
            if (entity.destroy) {
                entity.destroy();
            }
        }
        this.entities = [];
        console.log('Cleaned up scene:', this.constructor.name);
    }
}
