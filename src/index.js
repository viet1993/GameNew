
import Phaser from 'phaser';
import PlayScene from "./scenes/PlayScene";
import PreloadScene from "./scenes/Preload";

const WIDTH = 1280; 
const HEIGHT = 600;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
}
// scenes chạy tuần tự từ trái sang phải khi đặt trong 1 array
const Scenes = [PreloadScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  // WebGL ( Web graphics library ) JS API for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: initScenes()
}


new Phaser.Game(config);