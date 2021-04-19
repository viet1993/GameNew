import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.make.titlemap({key:'map'});
        const titleset1 = map.addTitlesetImage('main_lev_build_1', 'tiles-1');
        // const titleset2 = map.addTitlesetImage('main_lev_build_2', 'tiles-2');

        map.createStaticLayer('enviroment', titleset1);
        map.createStaticLayer('platforms', titleset1);
    }
}

export default PlayScene;