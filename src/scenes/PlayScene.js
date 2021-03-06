import Phaser from 'phaser';
import Player from '../entities/Player'
import Enemies from '../groups/Enemies'

import { getEnemyTypes } from '../types'

class PlayScene extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');
        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);    
        const playerZones = this.getPlayerZones(layers.playerZones); 
        const player = this.createPlayer(playerZones.start);
        const enemies = this.createEnemies(layers.enemySpawns);

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        })
        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
            }
        })
        this.createEndOfLevel(playerZones.end, player)
        this.setupFollowupCameraOn(player);

        this.graphics = this.add.graphics();
        this.line = new Phaser.Geom.Line();
        this.graphics.lineStyle(1, 0x00ff00);

        this.input.on('pointerdown', this.startDrawing, this)
        this.input.on('pointerup', this.finishDrawing, this)
    }

    startDrawing(pointer) {
        this.line.x1 = pointer.worldX;
        this.line.y1 = pointer.worldY;
    }

    finishDrawing(pointer) {
        this.line.x2 = pointer.worldX;
        this.line.y2 = pointer.worldY;

        this.graphics.strokeLineShape(this.line);
    }

    createMap() {
        const map = this.make.tilemap({key:'map'});
        map.addTilesetImage('main_lev_build_1', 'tiles-1');
        return map;
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1');
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset);
        const environment = map.createStaticLayer('environment', tileset);
        const platforms = map.createStaticLayer('platforms', tileset);
        const playerZones = map.getObjectLayer('player_zones');
        const enemySpawns = map.getObjectLayer('enemy_spawns');

        platformsColliders.setCollisionByProperty({collides:true});

        return { environment, platforms, platformsColliders, playerZones, enemySpawns };
    }

    createPlayer(start) {
        // const player = this.physics.add.sprite(100, 250, 'player');
        return new Player(this, start.x, start.y);
    }
    
    createEnemies(spawnLayer) {
        const enemies = new Enemies(this);
        const enemyTypes = enemies.getTypes();

        spawnLayer.objects.forEach(spawnPoint => {
            const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y)
            enemies.add(enemy);
        })

        return enemies;
    }

    createPlayerColliders(player, {colliders}) {
        player
            .addCollider(colliders.platformsColliders)
    }

    createEnemyColliders(enemies, {colliders}) {
        enemies
            .addCollider(colliders.platformsColliders)
            .addCollider(colliders.player);   
    }

    setupFollowupCameraOn(player) {
        const { height, width, mapOffset, zoomFactor } = this.config;
        // cho map m??? r???ng ra, ko g??y c???n tr??? cho nh??n v???t
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        //cho camera di chuy???n theo nh??n v???t
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
        this.cameras.main.startFollow(player);
    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }

    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
            .setAlpha(0)
            .setSize(2, this.config.height)
            .setOrigin(0.5, 1);

        this.physics.add.overlap(player, endOfLevel, () => {
            console.log('player won')
        })
    }
}

export default PlayScene;