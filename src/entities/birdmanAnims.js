


export default anims => {
    anims.create({
        key:'birdman-idle',
        frames: anims.generateFrameNumbers('player', {start:0, end: 8}),
        frameRate: 8,
        repeat: -1
    })
}