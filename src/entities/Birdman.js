import Enemy from './Enemy'
import initAnims from './birdmanAnims'
class Birdman extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'birdman');
    }

    shootProjectile() {

    }
}

export default Birdman;