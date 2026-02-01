# 🎮 Wonderland - 3D Game Engine

**奇地引擎** - An AI-driven 3D game engine built with Three.js

## Features

- **Modern 3D Graphics**: Built on Three.js for high-performance 3D rendering
- **Entity-Component System**: Modular and extensible architecture
- **First-Person Controller**: Built-in player controller with WASD movement and mouse look
- **Input Management**: Comprehensive keyboard and mouse input handling
- **Scene Management**: Easy-to-use scene loading and switching system
- **Shadow Rendering**: Real-time shadow mapping for realistic lighting
- **Physics Ready**: Architecture prepared for physics engine integration
- **Extensible**: Easy to add new entities, scenes, and game mechanics

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hierifer/wonderland.git
cd wonderland
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Architecture

### Core Components

#### GameEngine (`src/engine/GameEngine.js`)
The main engine class that manages:
- Three.js scene, camera, and renderer
- Game loop and delta time
- Entity management
- Input system integration
- Window resize handling

#### Scene System (`src/scenes/`)
- **Scene.js**: Base class for all game scenes
- **ExampleScene.js**: Demo scene showcasing engine features

Scenes manage collections of entities and scene-specific logic.

#### Entity System (`src/entities/`)
- **Entity.js**: Base class for all game objects
- **Player.js**: First-person player controller

Entities represent game objects with position, rotation, scale, and update logic.

#### Input Management (`src/utils/InputManager.js`)
Handles keyboard and mouse input with:
- Key press detection
- Mouse movement tracking
- Pointer lock for FPS controls
- Mouse button states

## Usage

### Creating a New Scene

```javascript
import { Scene } from './Scene.js';
import * as THREE from 'three';

export class MyScene extends Scene {
    load() {
        super.load();
        
        // Add objects to the scene
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 1, -5);
        this.engine.scene.add(cube);
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        // Update scene logic here
    }
}
```

### Creating a Custom Entity

```javascript
import { Entity } from './Entity.js';
import * as THREE from 'three';

export class MyEntity extends Entity {
    init() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        // Custom update logic
        if (this.mesh) {
            this.mesh.rotation.y += deltaTime;
        }
    }
}
```

### Using Input

```javascript
update(deltaTime) {
    const input = this.engine.getInput();
    
    if (input.isKeyPressed('KeyW')) {
        // Move forward
    }
    
    if (input.isMouseButtonPressed(0)) {
        // Handle left click
    }
    
    const mouseDelta = input.getMouseDelta();
    // Use mouseDelta.x and mouseDelta.y
}
```

## Controls

- **WASD**: Move around
- **Mouse**: Look around (click to lock pointer)
- **Space**: Jump
- **Click**: Interact

## Project Structure

```
wonderland/
├── index.html              # Entry HTML file
├── src/
│   ├── main.js            # Application entry point
│   ├── engine/
│   │   └── GameEngine.js  # Core engine class
│   ├── scenes/
│   │   ├── Scene.js       # Base scene class
│   │   └── ExampleScene.js # Demo scene
│   ├── entities/
│   │   ├── Entity.js      # Base entity class
│   │   └── Player.js      # Player controller
│   └── utils/
│       └── InputManager.js # Input handling
├── package.json
└── README.md
```

## Extending the Engine

### Adding Physics

The engine is designed to easily integrate physics engines like Cannon.js or Ammo.js:

```javascript
const engine = new GameEngine({
    enablePhysics: true,
    physicsEngine: new PhysicsWorld()
});
```

### Adding New Systems

Create new system classes and integrate them into the GameEngine:
- Audio system
- Particle system
- Animation system
- Collision detection
- AI/Pathfinding

### Scene Transitions

```javascript
const newScene = new MyNewScene(engine);
engine.loadScene(newScene);
```

## Performance Tips

1. Use geometry instancing for repeated objects
2. Implement frustum culling for large scenes
3. Use level-of-detail (LOD) for distant objects
4. Optimize materials and textures
5. Profile with browser DevTools

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

ISC

## Credits

Built with:
- [Three.js](https://threejs.org/) - 3D graphics library
- [Vite](https://vitejs.dev/) - Build tool and dev server
