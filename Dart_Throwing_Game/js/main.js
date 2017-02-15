// Global variables


var __gameId = 999;

var __userData,
    __tokensToPlayJSON,
    __tokensToPlay,
    n;

var dragButton,
    playButton,
    dynamicText,
    style;

var game = new Phaser.Game(560, 400, Phaser.CANVAS, 'Dart');

//Preload 'loading' images
var bootState = {

    preload: function(){
        this.load.image('loading_bar', './assets/img/loading_bar.png');
        this.load.image('loading_word', './assets/img/loading_word.png');
        this.load.spritesheet('spinner', './assets/sprites/loading-spinner/loading-spinner.png', 560, 400, 45);
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
        var spinner = this.add.sprite(0, 0, 'spinner');
        spinner.animations.add('spinning');
        spinner.animations.play('spinning', 20, true);
        this.add.image(game.width/2 - 33, game.height/2 + 110, 'loading_word');
        var loadingBar = this.add.image(game.width / 2, game.height/2 + 100, 'loading_bar');
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        //loading static images
        this.load.image('layer', './assets/img/opacity.png');
        this.load.image('token_ui', './assets/img/token-ui.png');
        this.load.image('drag_button', './assets/img/drag_button.png');
        this.load.image('sound_on', './assets/img/sound_on.png');
        this.load.image('sound_off', './assets/img/sound_off.png');
        this.load.image('bar', './assets/img/bar.png');
        this.load.image('points', './assets/img/points.png');

        //Loading sprites

/*
playId's

1= 1-5-1  y 6-5-1
2= 4-5-1  y 3-15-0
3= 4-5-2  y 1-5-2
4= 6-5-2 y 5-10-1
5= 8-10-1 y 2-10-1
6= 3-15-1 y 8-10-2
7= 5-10-2 y 7-20-1
8= 2-10-3
9= 7-20-3
10= jackpot

*/
        
        this.load.spritesheet('group_1_1-5-1', './assets/sprites/throws/1-5-1/1-5-1.jpg', 560, 400, 27);
        this.load.spritesheet('group_1_3-15-1', './assets/sprites/throws/3-15-1/3-15-1.jpg', 560, 400, 27);
        this.load.spritesheet('group_1_4-5-1', './assets/sprites/throws/4-5-1/4-5-1.jpg', 560, 400, 27);
        this.load.spritesheet('group_1_4-5-2', './assets/sprites/throws/4-5-2/4-5-2.jpg', 560, 400, 27);
        this.load.spritesheet('group_1_5-10-2', './assets/sprites/throws/5-10-2/5-10-2.jpg', 560, 400, 27);
        this.load.spritesheet('group_1_6-5-2', './assets/sprites/throws/6-5-2/6-5-2.jpg', 560, 400, 27);
        this.load.spritesheet('group_1_8-10-1', './assets/sprites/throws/8-10-1/8-10-1.jpg', 560, 400, 27);
        this.load.spritesheet('precount', './assets/sprites/precount/precount.png', 560, 400, 5);
        this.load.spritesheet('play_button', './assets/sprites/play_button/play_button.png', 52, 52, 11);
        this.load.spritesheet('throwButton', './assets/sprites/throwButton/throwButton.png', 97, 33, 11);
        this.load.spritesheet('jackpot', './assets/sprites/throws/jackpot/jackpot.jpg', 560, 400, 31);
        this.load.spritesheet('number', './assets/sprites/numbers/numbers.png', 30, 47, 10);
        this.load.spritesheet('7-20-3', './assets/sprites/throws/7-20-3/7-20-3.jpg', 560, 400); //playid9
        this.load.spritesheet('2-10-3', './assets/sprites/throws/2-10-3/2-10-3.jpg', 560, 400); //playid8
        this.load.spritesheet('start_button', './assets/sprites/start_button/start_button.png', 97, 33, 11);
        this.load.spritesheet('again_button', './assets/sprites/play_again_button/again.png', 147, 33, 10);
        this.load.spritesheet('confetti', './assets/sprites/final_animations/confetti/confetti.png', 560, 400, 30);
        this.load.spritesheet('group_2_1-5-2', './assets/sprites/throws/1-5-2/1-5-2.jpg', 560, 400, 27);
        this.load.spritesheet('group_2_2-10-1', './assets/sprites/throws/2-10-1/2-10-1.jpg', 560, 400, 27);
        this.load.spritesheet('group_2_3-15-0', './assets/sprites/throws/3-15-0/3-15-0.jpg', 560, 400, 27);
        this.load.spritesheet('group_2_5-10-1', './assets/sprites/throws/5-10-1/5-10-1.jpg', 560, 400, 27);
        this.load.spritesheet('group_2_6-5-1', './assets/sprites/throws/6-5-1/6-5-1.jpg', 560, 400, 27);
        this.load.spritesheet('group_2_7-20-1', './assets/sprites/throws/7-20-1/7-20-1.jpg', 560, 400, 27);
        this.load.spritesheet('group_2_8-10-2', './assets/sprites/throws/8-10-2/8-10-2.jpg', 560, 400, 27);
        this.load.spritesheet('expert', './assets/sprites/expert/expert.png', 40, 15, 10);
        this.load.spritesheet('newbie', './assets/sprites/newbie/newbie.png', 42, 15, 10);
        this.load.spritesheet('rookie', './assets/sprites/rookie/rookie.png', 40, 15, 10);
        this.load.spritesheet('skilled', './assets/sprites/skilled/skilled.png', 42, 16, 10);

        //Loading sounds

        this.load.audio('crowd', './assets/sounds/crowd.mp3');
        this.load.audio('count', './assets/sounds/count.mp3');
        this.load.audio('dart', './assets/sounds/dart.mp3');
        this.load.audio('throw', './assets/sounds/throw.mp3');

    },
    create: function(){

        //moving to the first gameplay state
        game.state.start('initState');

    },
}

var initState = {

    create: function(){

        var background = game.add.sprite(0, 0, 'precount');
        background.animations.add('static',[0]);
        background.animations.play('static');

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

    create: function(){

        __userData = getStartData(__gameId);

        var background = game.add.sprite(0, 0, 'precount');
        background.animations.add('static',[0]);
        background.animations.play('static');

        game.add.image(0, 0, 'layer');

        game.add.image(game.width / 2 - 234, game.height / 2 - 104, 'token_ui');

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

        style = { font: "11px Montserrat", fill: "#fff"};
        var text = game.add.text(480, 5, 'TOKENS', style);
            text = game.add.text(480, 20, 'POINTS', style);
            text = game.add.text(535, 5, __userData.tokenBalance, style);
            text = game.add.text(535, 20, __userData.pointBalance, style);
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
    [0,1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9,0],
    [2,3,4,5,6,7,8,9,0,1],
    [3,4,5,6,7,8,9,0,1,2],
    [4,5,6,7,8,9,0,1,2,3],
    [5,6,7,8,9,0,1,2,3,4],
    [6,7,8,9,0,1,2,3,4,5],
    [7,8,9,0,1,2,3,4,5,6],
    [8,9,0,1,2,3,4,5,6,7], 
    [9,0,1,2,3,4,5,6,7,8]
    ],

    playIdKeys: {
        groups: [
            ['group_1_1-5-1','group_1_1-5-1', 'group_1_3-15-1', 'group_1_4-5-1', 'group_1_4-5-2', 'group_1_5-10-2', 'group_1_6-5-2', 'group_1_8-10-1', '7-20-3', '2-10-3', 'jackpot'],
            ['group_2_1-5-2','group_2_1-5-2', 'group_2_2-10-1', 'group_2_3-15-0', 'group_2_5-10-1', 'group_2_6-5-1', 'group_2_7-20-1', 'group_2_8-10-2', '7-20-3', '2-10-3', 'jackpot']
            ]
    },

    prizesTable: [0, 2, 4, 8, 10, 25, 100, 250, 500, 2500, 5000],

    create: function(){


        __tokensToPlayJSON = playGame(__gameId, parseInt(dynamicText._text));
        __playId = __tokensToPlayJSON.playId;

        n = Math.floor((Math.random() * 2));

        var spriteKey = gamePlayState.playIdKeys.groups[n][__playId];

        var finalAnimation = game.add.sprite(0, 0, spriteKey);
        var confetti = this.add.sprite(0, 0, 'confetti');
        finalAnimation.animations.add('pingping', [0,1,2,3,4,5,6,7,8,9,10,11,12,9,10,11,12]);
        finalAnimation.animations.add('animation', [13,14,15,16,17,18,19,20,21,22,23,24,25,26]);
        finalAnimation.animations.add('stop', [26]);
        confetti.animations.add('hurray');

        var background = game.add.sprite(0, 0, 'precount');
        background.animations.add('counting',[1, 1, 2, 2, 3, 3, 4]);
        background.events.onAnimationStart.add(function(){
            game.add.audio('count').play();
            var interval = setInterval(function(){
                game.add.audio('count').play();
            },1000);
            setTimeout(function(){
                clearInterval(interval);
            }, 2000);

        });
        background.animations.play('counting', 2, false);
        background.events.onAnimationComplete.add(function(){

            var back = game.add.sprite(0, 0, 'precount');
            back.animations.add('static',[0]);
            back.animations.play('static');

            background.alpha = 0;
            throwButton  = game.add.sprite(game.width / 2 - 49, game.height/2 + 150, 'throwButton');
            throwButton.animations.add('no-hover', [0]);
            throwButton.animations.add('hover', [1, 2]);
            throwButton.animations.add('click', [2, 3, 4, 5, 6, 7, 8, 9, 10]);
            throwButton.inputEnabled = true;

            throwButton.events.onInputOver.add(function(){throwButton.animations.play('hover', 20, false);});

            throwButton.events.onInputOut.add(function(){throwButton.animations.play('no-hover');});

            throwButton.events.onInputDown.add(function(){

                back.alpha = 0;
                game.add.audio('throw').play();
                setTimeout(function(){game.add.audio('dart').play();},800);

                throwButton.animations.play('click', 15, false);
                throwButton.events.onAnimationComplete.add(function(){throwButton.destroy()});

                if(__playId == 10){
                    confetti.animations.play('hurray', 15, false);
                    setTimeout(function(){
                        game.add.audio('crowd').play();
                    },500);
                }


                finalAnimation.animations.play('pingping', 14, false);    
                finalAnimation.events.onAnimationComplete.add(function(){
                    finalAnimation.animations.play('animation', 14, false);
                    finalAnimation.events.onAnimationComplete.add(function(){
                        finalAnimation.animations.play('stop');
                        finalAnimation.animations.stop();

                        style = { font: "11px Montserrat", fill: "#fff"};
                        gamePlayState.add.text(55, 174, 'PLAYED', style);
                        gamePlayState.add.text(53, 186, 'TOKENS', style);
                        gamePlayState.add.text(465, 174, 'EARNED', style);
                        gamePlayState.add.text(468, 186, 'POINTS', style);
                        var amount = dynamicText._text;
                        var separation = amount.toString().length > 3 ? 24 : 34;
                        var position = amount.toString().length > 3 ? [535, 125] : [510, 100];
                        var n = ("" + amount).split("");
                        for(var i = 0; i < amount.toString().length; i++){
                            var number_two = gamePlayState.add.sprite((parseInt(i * separation) + position[1]) - (25 * (n.length)), game.world.centerY + 10, 'number');
                            number_two.animations.add('animation', gamePlayState.numbersArray[parseInt(n[i])]);
                            number_two.animations.play('animation', 20, false);
                        }
                        var tokensAmount = gamePlayState.prizesTable[__playId];
                        var separation = tokensAmount.toString().length > 3 ? 24 : 34;
                        var position = tokensAmount.toString().length > 3 ? [535, 125] : [510, 100];
                        var n = ("" + tokensAmount).split("");
                        for(var i = 0; i < tokensAmount.toString().length; i++){
                            var number_one = gamePlayState.add.sprite((parseInt(i * separation) + position[0]) - (25 * (n.length)), game.world.centerY + 10, 'number');
                            number_one.animations.add('animation', gamePlayState.numbersArray[parseInt(n[i])]);
                            number_one.animations.play('animation', 20, false);

                        }

                        var againButton = game.add.sprite(game.width / 2 - 70, 350, 'again_button');
                        againButton.animations.add('click');

                        againButton.inputEnabled = true;

                        againButton.events.onInputOver.add(function(){
                            againButton.animations.add('hover', [4]);
                            againButton.animations.play('hover');
                        });

                        againButton.events.onInputOut.add(function(){
                            againButton.animations.add('no-hover', [0]);
                            againButton.animations.play('no-hover');
                        });

                        //setting the event for the start button
                        againButton.events.onInputDown.add(function(){
                            againButton.animations.play('click', 15, false);
                            setTimeout(function(){
                                game.state.start('tokensState');
                            }, 500);
                        }, this);
                    });
                });
            });

        });

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