// Global variables

var __gameId = 999;

var __userData,
    __tokensToPlayJSON,
    __tokensToPlay;

var dragButton,
    playButton,
    dynamicText,
    style;

var game = new Phaser.Game(560, 400, Phaser.CANVAS, 'Skier');

//Preload 'loading' images
var bootState = {

    preload: function(){
        this.load.image('loading', './assets/loading.png');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // Have the game centered horizontally
        game.scale.pageAlignHorizontally = true;
        // And vertically
        game.scale.pageAlignVertically = true;
    },
    create: function(){
        //moving to the loaderState
        game.state.start('loaderState');

    }

};

var loaderState = {

    preload: function(){

        //showing loaging images
        this.stage.backgroundColor = "#fff";
        this.add.image(game.width/2 - 100, game.height/2 - 100, 'loading');

        //loading static images
        this.load.image('layer', './assets/img/blackout.png');
        this.load.image('token_ui', './assets/img/token-ui.png');
        this.load.image('drag_button', './assets/img/drag_button.png');
        this.load.image('panel_points','./assets/img/panel_points.png');
        this.load.image('tokens_icon', './assets/img/tokens_icon.png');
        this.load.image('points_icon', './assets/img/points_icon.png');
        this.load.image('start_screen', './assets/img/start_screen.png');
        this.load.image('sound_on', './assets/img/sound_on.png');
        this.load.image('sound_off', './assets/img/sound_off.png');
        this.load.image('bar', './assets/img/bar.png');
        this.load.image('closing-screen', './assets/img/closing-screen.png');
        this.load.spritesheet('expert', './assets/sprites/expert/expert.png', 40, 15, 10);
        this.load.spritesheet('newbie', './assets/sprites/newbie/newbie.png', 42, 15, 10);
        this.load.spritesheet('rookie', './assets/sprites/rookie/rookie.png', 40, 15, 10);
        this.load.spritesheet('skilled', './assets/sprites/skilled/skilled.png', 42, 16, 10);

        //Loading sprites
        this.load.spritesheet('pre_jump', './assets/sprites/pre_jump/main-prejump.png', 560, 400, 60);
        this.load.spritesheet('play_button', './assets/sprites/play_button/play_button.png', 52, 52, 11);
        this.load.spritesheet('snow','./assets/sprites/final_animations/snow/snow.png', 560, 400, 35);
        this.load.spritesheet('number', './assets/sprites/final_animations/numbers/n.png', 51, 59, 10);
        this.load.spritesheet('confetti', './assets/sprites/final_animations/confetti/confetti.png', 560, 400, 30);
        this.load.spritesheet('jackpot', './assets/sprites/final_animations/jackpot/jackpot.png', 277, 273, 40);
        this.load.spritesheet('start_button', './assets/sprites/start_button/start_button.png', 97, 33, 11);
        this.load.spritesheet('again_button', './assets/sprites/again_button/again_button.png', 147, 33, 10);
        
        //Loading sounds
        this.load.audio('crowd', './assets/sounds/crowd.mp3');

    },
    create: function(){

        //moving to the first gameplay state
        game.state.start('initState');

    },
}

var initState = {

    preload: function(){

        this.load.spritesheet('playid7','./assets/sprites/final_animations/playid7/playid7.jpg', 560, 400, 150);
        this.load.spritesheet('playid6','./assets/sprites/final_animations/playid6/playid6.jpg', 560, 400, 138);
        this.load.spritesheet('playid5','./assets/sprites/final_animations/playid5/playid5.jpg', 560, 400, 134);
        this.load.spritesheet('playid4','./assets/sprites/final_animations/playid4/playid4.jpg', 560, 400, 138);
        this.load.spritesheet('playid3','./assets/sprites/final_animations/playid3/playid3.jpg', 560, 400, 138);
        this.load.audio('bear-sound', './assets/sounds/bear-sound.mp3');
        this.load.audio('sound-music', './assets/sounds/sound-music.mp3');

    },

    create: function(){

        game.add.image(0, 0, 'start_screen');

        var startButton = this.add.sprite(game.width / 2 - 50, 350, 'start_button');
        startButton.animations.add('click', [2, 3, 4, 5, 6, 7, 8, 9, 10]);

        startButton.inputEnabled = true;
        startButton.events.onInputDown.add(function(){
            startButton.animations.play('click', 15, false);
            setTimeout(function(){
                game.state.start('tokensState');
            }, 500);
        }, this);

        startButton.events.onInputOver.add(function(){
            startButton.animations.add('hover', [1, 2]);
            startButton.animations.play('hover', 15, false);
        });

        startButton.events.onInputOut.add(function(){
            startButton.animations.add('no-hover', [2, 1, 0]);
            startButton.animations.play('no-hover', 15, false);
        });
    }
};

var tokensState = {
    preload: function(){

        this.load.spritesheet('playid2','./assets/sprites/final_animations/playid2/playid2.jpg', 560, 400, 138);
        this.load.spritesheet('playid1','./assets/sprites/final_animations/playid1/playid1.jpg', 560, 400, 145);
        this.load.spritesheet('playid0','./assets/sprites/final_animations/playid0/playid0.jpg', 560, 400, 138);

    },
    create: function(){

        __userData = getStartData(__gameId);

        var background = game.add.sprite(0, 0, 'pre_jump');
        background.animations.add('animate');
        background.animations.play('animate', 15, true);

        game.add.image(0, 0, 'layer');
        game.add.image(game.width / 2 - 234, game.height / 2 - 104, 'token_ui');

        var uiElements = game.add.group();
        uiElements.create(0 + 168, 0 + 12, 'tokens_icon');
        uiElements.create(40 + 168, 8 + 12, 'panel_points');
        uiElements.create(100 + 168, 0 + 12, 'points_icon');
        uiElements.create(140 + 168, 8 + 12, 'panel_points');

        playButton = game.add.sprite(460, game.height/2 - 26, 'play_button');
        playButton.animations.add('disabled', [0]);
        playButton.animations.add('available', [1]);
        playButton.animations.add('clicked', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        playButton.animations.play('available', 15);
        playButton.inputEnabled = true;

        playButton.events.onInputOver.add(function(){
            playButton.animations.add('hover', [1, 2]);
            playButton.animations.play('hover', 15, false);
        });

        playButton.events.onInputOut.add(function(){
            playButton.animations.add('no-hover', [2, 1]);
            playButton.animations.play('no-hover', 15, false);
        });

        playButton.events.onInputDown.add(function(){
            playButton.play('clicked');
            setTimeout(function(){
                game.state.start('gamePlayState');  
            },1000);
        });

        style = { font: "10px Montserrat", fill: "#fff"};
        var text = game.add.text(318, 5, 'POINTS', style);
            text = game.add.text(220, 5, 'TOKENS', style);
            text = game.add.text(220, 25, __userData.tokenBalance, style);
            text = game.add.text(318, 25, __userData.pointBalance, style);
            style = { font: "14px Montserrat", fill: "#000"};
        dynamicText = game.add.text(268, 122, '1', style);

        var sound_on = this.add.image(5, 5, 'sound_on');
        var sound_off = this.add.image(5, 20, 'sound_off');
        if(!game.sound.mute)sound_off.alpha = 0;
        else sound_on.alpha = 0;
        sound_on.inputEnabled = true;
        sound_on.events.onInputDown.add(function(target){
            game.sound.mute = true;
            sound_off.alpha = 1;
            target.alpha = 0;
        }, this);

        sound_off.inputEnabled = true;
        sound_off.events.onInputDown.add(function(target){
            game.sound.mute = false;
            sound_on.alpha = 1;
            target.alpha = 0;
        }, this);

        var bar = game.add.image(game.width / 2 - 192, game.height / 2 - 7, 'bar');
        dragButton = game.add.sprite(92, game.height / 2 - 8, 'drag_button');
        dragButton.inputEnabled = true;

        dragButton.input.enableDrag(true);
        dragButton.input.allowVerticalDrag = false;
        dragButton.events.onDragUpdate.add(updateDrag);

        bar.inputEnabled = true;
        bar.events.onInputDown.add(function(){
            dragButton.position.x = game.input.mousePointer.x - 10;
            updateDrag();
        });

        var newbie = game.add.sprite(85,220,'newbie');
        var rookie = game.add.sprite(172,220,'rookie');
        var skilled = game.add.sprite(282,220,'skilled');
        var expert = game.add.sprite(410,220,'expert');

        newbie.animations.add('static', [1]);
        newbie.animations.play('static', 15, false);
        rookie.animations.add('static', [1]);
        rookie.animations.play('static', 15, false);
        skilled.animations.add('static', [1]);
        skilled.animations.play('static', 15, false);
        expert.animations.add('static', [1]);
        expert.animations.play('static', 15, false);

        newbie.animations.add('moving', [1,2,3,4,5,6,7,8,9]);
        rookie.animations.add('moving', [1,2,3,4,5,6,7,8,9]);
        skilled.animations.add('moving', [1,2,3,4,5,6,7,8,9]);
        expert.animations.add('moving', [1,2,3,4,5,6,7,8,9]);
        
        setTimeout(function(){
            newbie.animations.play('moving', 15, false);
            rookie.animations.play('moving', 15, false);
            skilled.animations.play('moving', 15, false);
            expert.animations.play('moving', 15, false);
        },500);

        newbie.inputEnabled = true;
        newbie.events.onInputDown.add(function(){dragButton.position.x = 92;updateDrag();});
        rookie.inputEnabled = true;
        rookie.events.onInputDown.add(function(){dragButton.position.x = 182;updateDrag();});
        skilled.inputEnabled = true;
        skilled.events.onInputDown.add(function(){dragButton.position.x = 292;updateDrag();});
        expert.inputEnabled = true;
        expert.events.onInputDown.add(function(){dragButton.position.x = 432;updateDrag();});

    }
   
};

var gamePlayState = {

    numbersArray: [
    [1,2,3,4,5,6,7,8,9,0],
    [2,3,4,5,6,7,8,9,0,1],
    [3,4,5,6,7,8,9,0,1,2],
    [4,5,6,7,8,9,0,1,2,3],
    [5,6,7,8,9,0,1,2,3,4],
    [6,7,8,9,0,1,2,3,4,5],
    [7,8,9,0,1,2,3,4,5,6],
    [8,9,0,1,2,3,4,5,6,7], 
    [9,0,1,2,3,4,5,6,7,8],
    [0,1,2,3,4,5,6,7,8,9]
    ],

    playIdKeys: ['playid0','playid1','playid2','playid3','playid4','playid5','playid6','playid7'],

    prizesTable: [2, 4, 8, 10, 25, 100, 250, 500, 2500, 5000],

    create: function(){

        __tokensToPlayJSON = playGame(__gameId, parseInt(dynamicText._text));
        __playId = __tokensToPlayJSON.playId;

        console.log(__playId);
        console.log(gamePlayState.playIdKeys[__playId]);

        var windSound = game.add.audio('sound-music');
        windSound.fadeIn(1000);
        setTimeout(function(){windSound.fadeOut(2000);},10000);

        var finalAnimation = game.add.sprite(0, 0, gamePlayState.playIdKeys[__playId]);
        var confetti = this.add.sprite(0, 0, 'confetti');
        var snow = game.add.sprite(0, 0, 'snow');
        var jackpot = this.add.sprite(game.world.centerX + 130, 185, 'jackpot');
        finalAnimation.animations.add('animation');
        snow.animations.add('animation');
        confetti.animations.add('hurray');
        jackpot.animations.add('animation');

        var preJump = game.add.sprite(0, 0, 'pre_jump');
        preJump.animations.add('animation');
        
        preJump.animations.play('animation', 15, false);

        var uiElements = game.add.group();
        uiElements.create(0 + 168, 0 + 12, 'tokens_icon');
        uiElements.create(40 + 168, 8 + 12, 'panel_points');
        uiElements.create(100 + 168, 0 + 12, 'points_icon');
        uiElements.create(140 + 168, 8 + 12, 'panel_points');

        var sound_on = this.add.image(5, 5, 'sound_on');
        var sound_off = this.add.image(5, 20, 'sound_off');
        if(!game.sound.mute)sound_off.alpha = 0;
        else sound_on.alpha = 0;
        sound_on.inputEnabled = true;
        sound_on.events.onInputDown.add(function(target){
            game.sound.mute = true;
            sound_off.alpha = 1;
            target.alpha = 0;
        }, this);

        sound_off.inputEnabled = true;
        sound_off.events.onInputDown.add(function(target){
            game.sound.mute = false;
            sound_on.alpha = 1;
            target.alpha = 0;
        }, this);

        var style = { font: "10px Montserrat", fill: "#fff"};
        var text = game.add.text(318, 5, 'POINTS', style);
            text = game.add.text(220, 5, 'TOKENS', style);
            text = game.add.text(220, 25, __userData.tokenBalance, style);
            text = game.add.text(318, 25, __userData.pointBalance, style);
            
        preJump.events.onAnimationComplete.add(function(){
            preJump.alpha = 0;
            finalAnimation.animations.play('animation', 15, false);
            snow.animations.play('animation', 15, true);

            setTimeout(function(){
                if(__playId == 7){
                    game.add.audio('crowd').play();
                    confetti.animations.play('hurray', 15, true);
                    jackpot.scale.setTo(.5, .5);
                    jackpot.animations.play('animation', 15, true);
                }
                if(__playId == 2)setTimeout(function(){game.add.audio('bear-sound').play();},1800);

                setTimeout(function(){
                    gamePlayState.add.image(0, 0, 'closing-screen');
                    var amount = dynamicText._text;
                    var separation = amount.toString().length > 3 ? 24 : 34;
                    var position = amount.toString().length > 3 ? [440, 190] : [410, 170];
                    var n = ("" + amount).split("");
                    for(var i = 0; i < amount.toString().length; i++){
                        var number_two = gamePlayState.add.sprite((parseInt(i * separation) + position[1]) - (25 * (n.length)), game.world.centerY - 40, 'number');
                        number_two.animations.add('animation', gamePlayState.numbersArray[parseInt(n[i])]);
                        number_two.animations.play('animation', 20, false);
                    }
                    var tokensAmount = gamePlayState.prizesTable[__playId];
                    var separation = tokensAmount.toString().length > 3 ? 24 : 34;
                    var position = tokensAmount.toString().length > 3 ? [440, 190] : [410, 170];
                    var n = ("" + tokensAmount).split("");
                    for(var i = 0; i < tokensAmount.toString().length; i++){
                        var number_one = gamePlayState.add.sprite((parseInt(i * separation) + position[0]) - (25 * (n.length)), game.world.centerY - 40, 'number');
                        number_one.animations.add('animation', gamePlayState.numbersArray[parseInt(n[i])]);
                        number_one.animations.play('animation', 20, false);

                    }

                    var againButton = game.add.sprite(game.width / 2 - 70, game.height - 68, 'again_button');
                    againButton.animations.add('click');
                    //setting the event for the start button
                    againButton.inputEnabled = true;
                    againButton.events.onInputDown.add(function(){
                        windSound.stop();
                        againButton.animations.play('click', 15, false);
                        setTimeout(function(){
                            __playId++;
                            game.state.start('tokensState');
                        }, 500);
                    }, this);
                },3000);

            }, 1400);
        });
    }   
    
};


//setting all the game-states
game.state.add('loaderState', loaderState);
game.state.add('bootState', bootState);
game.state.add('tokensState', tokensState);
game.state.add('initState', initState);
game.state.add('gamePlayState', gamePlayState);
game.state.start('bootState');

var limitRight = 432;
function updateDrag(){

    dragButton.position.y = 192;
    if(dragButton.position.x > limitRight)
        dragButton.position.x = limitRight;
    else if(dragButton.position.x < 92)
        dragButton.position.x = 92;

    var draggedVal;
    var position = dragButton.position.x;

    if(position >= 92 && position < (190))
        draggedVal = (((position - 92) * 11) / 98);
    else if(position >= 190 && position < (285))
        draggedVal = (((position - 190) * 32) / 98) + 10;
    else if(position >= (285))
        draggedVal = (((position - 285) * 140) / 98) + 40;

    if(position > 102) playButton.play('available');
    //if(position == 92) playButton.play('disabled');
    
    playButton.inputEnabled = true;
    playButton.events.onInputDown.add(function(){
        if(position >= 92){
            playButton.play('clicked');
            setTimeout(function(){
            game.state.start('gamePlayState');  
          },1000)
        } 
    });

    if(draggedVal > __userData.tokenBalance){
        limitRight = position++;
        draggedVal = __userData.tokenBalance;
    }

    if(draggedVal < 1)draggedVal = 1;

    dynamicText.destroy();
    dynamicText = game.add.text(268, 122, parseInt(draggedVal), style);
}