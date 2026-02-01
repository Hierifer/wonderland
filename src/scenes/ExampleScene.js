import * as THREE from 'three';
import { Scene } from './Scene.js';
import { Player } from '../entities/Player.js';

/**
 * Example Scene - Demonstrates the game engine capabilities
 */
export class ExampleScene extends Scene {
    constructor(engine) {
        super(engine);
        this.time = 0;
        this.cubes = [];
    }
    
    load() {
        super.load();
        
        // Add ground plane
        this.createGround();
        
        // Add some 3D objects
        this.createCubes();
        
        // Add spinning objects
        this.createSpinningObjects();
        
        // Add player controller
        this.player = new Player(this.engine);
        this.addEntity(this.player);
        
        // Add grid helper for reference
        const gridHelper = new THREE.GridHelper(50, 50);
        this.engine.scene.add(gridHelper);
        
        console.log('✨ Example scene loaded with 3D objects');
    }
    
    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x228B22,
            roughness: 0.8,
            metalness: 0.2
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.engine.scene.add(ground);
    }
    
    createCubes() {
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
        
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshStandardMaterial({ 
                color: colors[i],
                roughness: 0.5,
                metalness: 0.5
            });
            const cube = new THREE.Mesh(geometry, material);
            
            // Position cubes in a line
            cube.position.set(i * 5 - 10, 1, -5);
            cube.castShadow = true;
            cube.receiveShadow = true;
            
            this.engine.scene.add(cube);
            this.cubes.push(cube);
        }
    }
    
    createSpinningObjects() {
        // Spinning sphere
        const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x00ffff,
            roughness: 0.3,
            metalness: 0.7,
            emissive: 0x003333
        });
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.position.set(-8, 3, 5);
        this.sphere.castShadow = true;
        this.engine.scene.add(this.sphere);
        
        // Spinning torus
        const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const torusMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xff6600,
            roughness: 0.4,
            metalness: 0.6
        });
        this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.torus.position.set(8, 3, 5);
        this.torus.castShadow = true;
        this.engine.scene.add(this.torus);
        
        // Add some random floating crystals
        for (let i = 0; i < 10; i++) {
            const crystalGeometry = new THREE.OctahedronGeometry(0.5);
            const crystalMaterial = new THREE.MeshStandardMaterial({
                color: Math.random() * 0xffffff,
                roughness: 0.2,
                metalness: 0.8,
                emissive: Math.random() * 0x333333
            });
            const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
            
            crystal.position.set(
                (Math.random() - 0.5) * 40,
                Math.random() * 5 + 2,
                (Math.random() - 0.5) * 40
            );
            crystal.castShadow = true;
            
            this.engine.scene.add(crystal);
        }
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        
        this.time += deltaTime;
        
        // Animate cubes - make them bob up and down
        this.cubes.forEach((cube, index) => {
            cube.position.y = 1 + Math.sin(this.time * 2 + index) * 0.5;
            cube.rotation.y += deltaTime;
        });
        
        // Rotate spinning objects
        if (this.sphere) {
            this.sphere.rotation.x += deltaTime * 0.5;
            this.sphere.rotation.y += deltaTime;
            this.sphere.position.y = 3 + Math.sin(this.time) * 0.5;
        }
        
        if (this.torus) {
            this.torus.rotation.x += deltaTime * 0.7;
            this.torus.rotation.y += deltaTime * 0.5;
            this.torus.position.y = 3 + Math.cos(this.time) * 0.5;
        }
    }
}
