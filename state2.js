demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
    },
    create: function(){
        game.stage.backgroundColor = '#DDDDDD';
        var endText = 'Game Over';
        game.add.text(300,200,endText);
    },
}