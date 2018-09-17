
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('diamond', 'assets/diamond.png', 32, 48);
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.add.sprite(0,0, 'sky');
        
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
       ground.scale.setTo(2,2);
        ground.body.immovable = true;
        
        var ledge = platforms.create(300, 300, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-200, 200, 'ground');
        ledge.body.immovable = true;
         
        ledge = platforms.create(400, 100, 'ground');
        ledge.body.immovable = true;
        
        ledge = platforms.create(-75, 450, 'ground');
        ledge.body.immovable = true; 
        
        
        player = game.add.sprite(800/2, game.world.height - 150, 'dude');
        
        game.physics.arcade.enable(player);
        
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

         
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        
        diamonds = game.add.group();
        diamonds.enableBody = true;
        var bigShiny = diamonds.create(100, 170,'diamond');
        bigShiny.body.immovable = true;
        bigShiny = diamonds.create(700, 70,'diamond');
        bigShiny.body.immovable = true;    
        bigShiny = diamonds.create(200, 420,'diamond');
        bigShiny.body.immovable = true;   
        bigShiny = diamonds.create(550, 270,'diamond');
        bigShiny.body.immovable = true;
        
        
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    update: function(){
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(diamonds, platforms);
        game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
        
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
        //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
        //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
        //  Stand still
            player.animations.stop();

            player.frame = 4;
        }
    
    //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }
        
}
}
    
function collectDiamond (player, diamonds) {
    
    // Removes the star from the screen
    diamonds.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
    if (score>=40){
        endScreen();
    }
}

function endScreen(){
    game.state.start('state2');
}

