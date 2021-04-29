import Enemy from './Enemy'

class Snake extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'snake');
    }
}

export default Snake;