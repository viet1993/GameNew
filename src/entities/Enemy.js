import Phaser from 'phaser';
import initAnimations from './playerAnims';

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
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, '', this);
    }
    update() {
        const { left, right, space, up } = this.cursors;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const onFloor = this.body.onFloor();

        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        }
        else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        }
        else {
            this.setVelocityX(0);
        }
        // onFloor khi chạm xuống đất mới cho nhảy tiếp
        if(isSpaceJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.playerSpeed * 2);
            this.jumpCount++;
        }

        if(onFloor) { 
            this.jumpCount = 0;
        }
        // dont play it again if it's already playing
        // second value => ignoreIfPlaying

        onFloor ?
            this.body.velocity.x === 0 ?
            this.play('idle', true) : this.play('run', true)
        :
            this.play('jump', true)
    }
}

export default Enemy;