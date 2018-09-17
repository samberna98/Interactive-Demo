var demo = {}, text = "To Start Game Press The Spacebar", platforms, player, diamonds, cursors, score=0, scoreText;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 4);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0, 'sky');
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
       ground.scale.setTo(2,2);
        ground.body.immovable = true;
        
        game.add.text(160,200,text);
       game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(startGame, null, null, )
               
        
    },

};

function startGame(){
    game.state.start('state1')
}

