import * as THREE from 'three';
import { InputManager } from '../utils/InputManager.js';

/**
 * Core Game Engine class built with Three.js
 * Manages scene, camera, renderer, and game loop
 */
export class GameEngine {
    constructor(options = {}) {
        this.container = options.container || document.body;
        this.enablePhysics = options.enablePhysics || false;
        
        // Core Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        // Game state
        this.isRunning = false;
        this.currentScene = null;
        this.clock = new THREE.Clock();
        this.deltaTime = 0;
        
        // Systems
        this.inputManager = new InputManager();
        this.entities = [];
        
        // Initialize the engine
        this.init();
    }
    
    /**
     * Initialize the core engine components
     */
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Sky blue
        
        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            75, // FOV
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near plane
            1000 // Far plane
        );
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);
        
        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Setup lighting (ambient + directional)
        this.setupLighting();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        console.log('🎮 Game Engine initialized');
    }
    
    /**
     * Setup default lighting
     */
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        
        // Configure shadow properties
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -20;
        directionalLight.shadow.camera.right = 20;
        directionalLight.shadow.camera.top = 20;
        directionalLight.shadow.camera.bottom = -20;
        
        this.scene.add(directionalLight);
    }
    
    /**
     * Load a scene into the engine
     */
    loadScene(sceneObject) {
        if (this.currentScene) {
            this.currentScene.cleanup();
        }
        
        this.currentScene = sceneObject;
        this.currentScene.load();
        
        console.log('✅ Scene loaded:', sceneObject.constructor.name);
    }
    
    /**
     * Add an entity to the engine
     */
    addEntity(entity) {
        this.entities.push(entity);
        if (entity.mesh) {
            this.scene.add(entity.mesh);
        }
    }
    
    /**
     * Remove an entity from the engine
     */
    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
            if (entity.mesh) {
                this.scene.remove(entity.mesh);
            }
        }
    }
    
    /**
     * Start the game engine
     */
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.clock.start();
            this.animate();
            console.log('▶️  Game Engine started');
        }
    }
    
    /**
     * Stop the game engine
     */
    stop() {
        this.isRunning = false;
        console.log('⏸️  Game Engine stopped');
    }
    
    /**
     * Main animation loop
     */
    animate() {
        if (!this.isRunning) return;
        
        requestAnimationFrame(() => this.animate());
        
        // Calculate delta time
        this.deltaTime = this.clock.getDelta();
        
        // Update current scene
        if (this.currentScene) {
            this.currentScene.update(this.deltaTime);
        }
        
        // Update all entities
        for (const entity of this.entities) {
            if (entity.update) {
                entity.update(this.deltaTime);
            }
        }
        
        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * Handle window resize
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    /**
     * Get input state
     */
    getInput() {
        return this.inputManager;
    }
}
