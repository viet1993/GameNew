import Phaser from 'phaser';
import initAnimations from './birdmanAnims';

import collidable from '../mixins/collidable';

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.keyEnemy = key;
        Object.assign(this, collidable)

        this.init();
        this.initEvents();
    }

    init() {
        this.gravity = 500;
        this.speed = 150;
        this.rayGraphics = this.scene.add.graphics({lineStyle: { width :2, color:0xaa00aa }});
        
        this.body.setGravityY(this.gravity);
        
        if(this.keyEnemy == 'birdman') {
            this.setSize(25, 45);
            this.setOffset(5, 20);
        }
        
        else {
            this.setSize(25, 60);
            this.setOffset(5, 3);
        }
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        // chọn điểm trung tâm tấm hình nhân vật ở giữa
        this.setOrigin(0.5, 1);

        initAnimations(this.scene.anims);
    }
    // update event animation
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time, delta) {
        this.setVelocityX(30);
        const ray = this.raycast(this.body);

        this.rayGraphics.clear();
        this.rayGraphics.strokeLineShape(ray);
    }

    raycast(body, raylengh = 30) {
        const { x, y, width, halfHeight } = body;
        const line = new Phaser.Geom.Line();

        line.x1 = x + width;
        line.y1 = y + halfHeight;
        line.x2 = line.x1 + raylengh;
        line.y2 = line.y1 + raylengh;

        return line
    }
}

export default Enemy;