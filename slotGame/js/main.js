// Global variables

var __gameId = 999;

var __userData,
    __tokensToPlayJSON,
    __tokensToPlay = 0,
    __button_spin,
    __soundEneabled = true,
    __click,
    __spinning;

var game = new Phaser.Game(560, 400, Phaser.CANVAS, 'Slot Game');

//Preload 'loading' images
var bootState = {

    preload: function(){

        this.load.image('background', './assets/img/bg.png');
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
        this.add.image(0, 0, 'background');
        var style = { font: "30px Montserrat", fill: "#fff"};
        this.add.text(180, 180, 'Loading game ', style);

        //loaging images
        this.load.image('points_icon', './assets/img/points_icon.png');
        this.load.image('tokens_icon', './assets/img/tokens_icon.png');
        this.load.image('panel_points', './assets/img/panel_points.png');
        this.load.image('sound_on', './assets/img/sound-on.png');
        this.load.image('sound_hover', './assets/img/sound-hover.png');
        this.load.image('sound_off', './assets/img/sound-off.png');
        this.load.image('dot1', './assets/img/dot1.png');
        this.load.image('dot2', './assets/img/dot2.png');
        this.load.image('clean', './assets/img/clean.png');
        this.load.image('clean2', './assets/img/clean2.png');
        this.load.image('bet', './assets/img/bet.png');
        this.load.image('tableId', './assets/img/tableId.png');
        this.load.image('opacity', './assets/img/opacity.png');
        this.load.image('about', './assets/img/about.png');
        this.load.image('about-hover', './assets/img/about-hover.png');
        this.load.image('init-frame', './assets/img/init-frame.png');

        //loading sprites
        this.load.spritesheet('button_1', './assets/sprites/buttons/1.png', 55, 22, 8);
        this.load.spritesheet('button_10', './assets/sprites/buttons/10.png', 55, 22, 8);
        this.load.spritesheet('button_50', './assets/sprites/buttons/50.png', 55, 22, 8);
        this.load.spritesheet('button_250', './assets/sprites/buttons/250.png', 55, 22, 8);
        this.load.spritesheet('button_spin', './assets/sprites/buttons/spin.png', 86, 34, 9);
        this.load.spritesheet('numbers', './assets/sprites/n.png', 50, 59, 10);
        this.load.spritesheet('ribbon1', './assets/sprites/ribbons/ribbon1.png', 120, 560, 5);
        this.load.spritesheet('ribbon2', './assets/sprites/ribbons/ribbon2.png', 120, 560, 5);
        this.load.spritesheet('ribbon3', './assets/sprites/ribbons/ribbon3.png', 120, 560, 5);
        this.load.spritesheet('hamburguer_1', './assets/sprites/icons/hamburguer/hamburguer1.png', 120, 400, 30);
        this.load.spritesheet('winning_hamburguer', './assets/sprites/winnings/hamburguer.png', 560, 400, 60);
        this.load.spritesheet('hamburguer_2', './assets/sprites/icons/hamburguer/hamburguer2.png', 120, 400, 30);
        this.load.spritesheet('hamburguer_3', './assets/sprites/icons/hamburguer/hamburguer3.png', 120, 400, 30);
        this.load.spritesheet('hotdog_1', './assets/sprites/icons/hotdog/hotdog1.png', 120, 400, 30);
        this.load.spritesheet('winning_hotdog', './assets/sprites/winnings/hotdog.png', 560, 400, 60);
        this.load.spritesheet('hotdog_2', './assets/sprites/icons/hotdog/hotdog2.png', 120, 400, 30);
        this.load.spritesheet('hotdog_3', './assets/sprites/icons/hotdog/hotdog3.png', 120, 400, 30);
        this.load.spritesheet('logo_1', './assets/sprites/icons/logo/logo1.png', 120, 400, 30);
        this.load.spritesheet('winning_logo', './assets/sprites/winnings/logo.png', 560, 400, 60);
        this.load.spritesheet('logo_2', './assets/sprites/icons/logo/logo2.png', 120, 400, 30);
        this.load.spritesheet('logo_3', './assets/sprites/icons/logo/logo3.png', 120, 400, 30);
        this.load.spritesheet('pizza_1', './assets/sprites/icons/pizza/pizza1.png', 120, 400, 30);
        this.load.spritesheet('winning_pizza', './assets/sprites/winnings/pizza.png', 560, 400, 60);
        this.load.spritesheet('pizza_2', './assets/sprites/icons/pizza/pizza2.png', 120, 400, 30);
        this.load.spritesheet('pizza_3', './assets/sprites/icons/pizza/pizza3.png', 120, 400, 30);
        this.load.spritesheet('cake_1', './assets/sprites/icons/cake/cake1.png', 120, 400, 30);
        this.load.spritesheet('winning_cake', './assets/sprites/winnings/cake.png', 560, 400, 60);
        this.load.spritesheet('cake_2', './assets/sprites/icons/cake/cake2.png', 120, 400, 30);
        this.load.spritesheet('cake_3', './assets/sprites/icons/cake/cake3.png', 120, 400, 30);
        this.load.spritesheet('coffee_1', './assets/sprites/icons/coffee/coffee1.png', 120, 400, 30);
        this.load.spritesheet('winning_coffee', './assets/sprites/winnings/coffee.png', 560, 400, 60);
        this.load.spritesheet('coffee_2', './assets/sprites/icons/coffee/coffee2.png', 120, 400, 30);
        this.load.spritesheet('coffee_3', './assets/sprites/icons/coffee/coffee3.png', 120, 400, 30);
        this.load.spritesheet('cookies_1', './assets/sprites/icons/cookies/cookies1.png', 120, 400, 30);
        this.load.spritesheet('winning_cookies', './assets/sprites/winnings/cookies.png', 560, 400, 60);
        this.load.spritesheet('cookies_2', './assets/sprites/icons/cookies/cookies2.png', 120, 400, 30);
        this.load.spritesheet('cookies_3', './assets/sprites/icons/cookies/cookies3.png', 120, 400, 30);
        this.load.spritesheet('fries_1', './assets/sprites/icons/fries/fries1.png', 120, 400, 30);
        this.load.spritesheet('winning_fries', './assets/sprites/winnings/fries.png', 560, 400, 60);
        this.load.spritesheet('fries_2', './assets/sprites/icons/fries/fries2.png', 120, 400, 30);
        this.load.spritesheet('fries_3', './assets/sprites/icons/fries/fries3.png', 120, 400, 30);
        this.load.spritesheet('ice_cream_1', './assets/sprites/icons/ice_cream/ice_cream1.png', 120, 400, 30);
        this.load.spritesheet('winning_ice_cream', './assets/sprites/winnings/ice_cream.png', 560, 400, 60);
        this.load.spritesheet('ice_cream_2', './assets/sprites/icons/ice_cream/ice_cream2.png', 120, 400, 30);
        this.load.spritesheet('ice_cream_3', './assets/sprites/icons/ice_cream/ice_cream3.png', 120, 400, 30);
        this.load.spritesheet('again_button', './assets/sprites/play_again_button/again.png', 147, 33, 10);
        this.load.spritesheet('confetti', './assets/sprites/confetti/confetti.png', 560, 400, 30);
        this.load.spritesheet('big_win', './assets/sprites/big_win/big_win.png', 277, 273, 40);
        this.load.spritesheet('golden_stars', './assets/sprites/stars/golden-stars.png', 249, 150, 20);
        this.load.spritesheet('white_stars', './assets/sprites/stars/white-stars.png', 249, 150, 20);

        //loading sounds
        this.load.audio('spinnin', './assets/sounds/spinnin.mp3');
        this.load.audio('crowd', './assets/sounds/crowd.mp3');
        this.load.audio('boy', './assets/sounds/boy.mp3');
        this.load.audio('boy2', './assets/sounds/boy2.mp3');
        this.load.audio('click', './assets/sounds/click.mp3');

    },
    create: function(){

        //moving to the first gameplay state
        game.state.start('tokensState');

    },
}

var tokensState = {

    playIdsTable: ['','','coffee', 'cookies', 'ice_cream', 'cake', 'fries', 'hotdog', 'hamburguer', 'pizza', 'logo'],
    prizesTable: [0, 0, 2, 4, 8, 10, 25, 100, 250, 500, 2500, 5000],

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
    [0,1,2,3,4,5,6,7,8,9],
    ],

    pingPongArray: [
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,28,27,26,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],//normaloop
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26],//cooffeloop
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]//logo loop
    ],

    create: function(){

        __userData = getStartData(__gameId);
        this.add.image(0, 0, 'background');

        this.add.image(46, 104, 'dot2');
        this.add.image(46, 184, 'dot1');
        this.add.image(46, 264, 'dot2');
        this.add.image(500, 104, 'dot2');
        this.add.image(500, 184, 'dot1');
        this.add.image(500, 264, 'dot2');
        this.add.image(480, 15, 'bet');

        var initFrame = this.add.image(130,78, 'init-frame');

        var sound_on = this.add.image(40, 20, 'sound_on');
        var sound_off = this.add.image(40, 50, 'sound_off');

        //game.sound.mute = true;
        if(!game.sound.mute)sound_off.alpha = 0;
        else sound_on.alpha = 0;
        sound_on.inputEnabled = true;
        sound_on.events.onInputDown.add(function(target){
            game.sound.mute = true;
            sound_off.alpha = 1;
            target.alpha = 0;
        }, this);


        sound_on.events.onInputOver.add(function(){sound_on.loadTexture('sound_hover', 0, false);});
        sound_on.events.onInputOut.add(function(){sound_on.loadTexture('sound_on', 0, false);});

        sound_off.inputEnabled = true;
        sound_off.events.onInputDown.add(function(target){
            game.sound.mute = false;
            sound_on.alpha = 1;
            target.alpha = 0;
        }, this);

        var uiElements = this.add.group();
        uiElements.create(0 + 170, 0 + 12, 'tokens_icon');
        uiElements.create(40 + 170, 8 + 12, 'panel_points');
        uiElements.create(100 + 170, 0 + 12, 'points_icon');
        uiElements.create(140 + 170, 8 + 12, 'panel_points');

        var style = { font: "10px Montserrat", fill: "#fff"};
        var text = this.add.text(321, 5, 'POINTS', style);
            text = this.add.text(220, 5, 'TOKENS', style);
            text = this.add.text(232, 25, __userData.tokenBalance, style);
            text = this.add.text(330, 25, __userData.pointBalance, style);
        var styleBet = { font: "16px Montserrat", fill: "#fff"};
        var tokensToText = this.add.text(497, 20, __tokensToPlay, styleBet);
    
        var ribbon1 = this.add.sprite(110, -84, 'ribbon1');
        var ribbon2 = this.add.sprite(225, -84, 'ribbon2');
        var ribbon3 = this.add.sprite(340, -84, 'ribbon3');
        
        ribbon1.animations.add('rolling', [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4]);
        ribbon1.alpha = 0;
        ribbon2.animations.add('rolling', [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4]);
        ribbon2.alpha = 0;
        ribbon3.animations.add('rolling', [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4]);
        ribbon3.alpha = 0;

        var button_1 = this.add.image(0 + 68, 350, 'button_1');
        var button_10 = this.add.image(80 + 68, 350, 'button_10');
        __button_spin = this.add.image(170 + 68, 340, 'button_spin');
        __button_spin.animations.add('disabled', [0]);
        __button_spin.animations.add('aviable', [1]);
        __button_spin.animations.add('hover', [1,2,3]);
        __button_spin.animations.add('out', [3,2,1]);
        __button_spin.animations.add('down', [4,5,6,7,8,9]);
        var button_50 = this.add.image(290 + 68, 350, 'button_50');
        var button_250 = this.add.image(370 + 68, 350, 'button_250');

        var clean = this.add.image(512, 12, 'clean');
        clean.inputEnabled = true;
        clean.events.onInputDown.add(function(){
            clean.loadTexture('clean2', 0, false);
            setTimeout(function(){clean.loadTexture('clean', 0, false);},100)
            __tokensToPlay = 0;
            __button_spin.play('disabled', 20, false);
            tokensToText.x = 497;
            tokensToText.setText(1);
        });

        __click = game.add.audio('click');
        __spinning = game.add.audio('spinnin');

        var tableId = this.add.image(155, -500, 'tableId');
        tableId.alpha = 0;
        tableId.inputEnabled = true;
        var about = this.add.image(85, 20, 'about');
        about.events.onInputOver.add(function(){about.loadTexture('about-hover', 0, false);});
        about.events.onInputOut.add(function(){about.loadTexture('about', 0, false);});
        about.inputEnabled = true;
        about.events.onInputDown.add(function(){
            game.add.tween(tableId).to({top: 5, alpha: 1}, 450, Phaser.Easing.Linear.None, true, 0, 0, false);
        });

        tableId.events.onInputDown.add(function(){
            game.add.tween(tableId).to({top: -500, alpha: 0}, 450, Phaser.Easing.Linear.None, true, 0, 0, false);
        });


        __button_spin.inputEnabled = true;
        __button_spin.events.onInputOver.add(function(){ if(__tokensToPlay)__button_spin.play('hover', 20, false); });
        __button_spin.events.onInputOut.add(function(){ if(__tokensToPlay)__button_spin.play('out', 20, false); });
        __button_spin.events.onInputDown.add(function(){
            if(__tokensToPlay){
                __button_spin.play('down', 20, false);
                __button_spin.events.onAnimationComplete.add(function(){
                    __button_spin.inputEnabled = false;
                })
                __click.play();
                __spinning.play();
                __tokensToPlayJSON = playGame(__gameId, __tokensToPlay);
                __tokensToPlayJSON.playId = __tokensToPlayJSON.playId == 1 ? 2 : __tokensToPlayJSON.playId;
                initFrame.alpha = 0;
                ribbon1.alpha = 1;
                ribbon1.animations.play('rolling', 20, false);
                ribbon2.alpha = 1;
                ribbon2.animations.play('rolling', 20, false);
                ribbon3.alpha = 1;
                ribbon3.animations.play('rolling', 20, false);
                button_1.inputEnabled = false;
                button_10.inputEnabled = false;
                button_50.inputEnabled = false;
                button_250.inputEnabled = false;
                var key = tokensState.playIdsTable[__tokensToPlayJSON.playId];
                var treeArray = [1,2,3].sort(function() { return .5 - Math.random(); });
                var flag = 0;
                ribbon3.events.onAnimationComplete.add(function(){
                    if(!flag){
                        flag++;
                        ribbon1.y += 80;
                        ribbon1.loadTexture(key +'_'+ treeArray[0], 0, false);
                        ribbon1.animations.add('finished');
                        ribbon1.animations.play('finished', 20, false);
                        ribbon2.y += 80;
                        ribbon2.loadTexture(key +'_'+ treeArray[1], 0, false);
                        ribbon2.animations.add('finished');
                        ribbon2.animations.play('finished', 20, false);
                        ribbon3.y += 80;
                        ribbon3.loadTexture(key +'_'+ treeArray[2], 0, false);
                        ribbon3.animations.add('finished');
                        ribbon3.animations.play('finished', 20, false);
                        ribbon1.events.onAnimationComplete.add(function(){
                            var opacity = tokensState.add.image(0 , 0, 'opacity');
                            var winning = tokensState.add.sprite(0, 0, 'winning_' + key);
                            var index = __tokensToPlayJSON.playId == 10  ? 2 : __tokensToPlayJSON.playId == 2 ? 1 : 0
                            winning.animations.add('winning', tokensState.pingPongArray[index]);
                            game.add.audio((__tokensToPlayJSON.playId == 10 || __tokensToPlayJSON.playId == 2) ? 'boy2' : 'boy').play()
                            winning.animations.play('winning', 20, false);
                            setTimeout(function(){
                                var againButton = game.add.sprite(35 + 90, 350, 'again_button');
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
                                        __tokensToPlay = 0;
                                        game.state.start('tokensState');
                                    }, 500);
                                }, this);
                            }, 1000);
                            var amount = tokensState.prizesTable[__tokensToPlayJSON.playId];
                            var n = ("" + amount).split("");
                            var distance = (amount.toString().length == 4 ? 140 : amount.toString().length == 3 ? 132 : amount.toString().length == 2 ? 126 : 120) + 90;
                            for(var i = 0; i < amount.toString().length; i++){
                                var number = tokensState.add.sprite((parseInt(i * 34) + distance) - (25 * (n.length)), game.world.centerY + 80, 'numbers');
                                number.scale.setTo(.8, .8);
                                number.animations.add('animation', tokensState.numbersArray[parseInt(n[i])]);
                                number.animations.play('animation', 20, false);
                            }
                            var stars = game.add.sprite(90, 90, (__tokensToPlayJSON.playId == 10) ? 'golden_stars' : 'white_stars');
                            stars.animations.add('shining');
                            stars.animations.play('shining', 20, true);
                            if(__tokensToPlayJSON.playId == 10){
                                var bigwin = game.add.sprite(40 + 90,120,'big_win');
                                bigwin.scale.setTo(.5, .5);
                                bigwin.animations.add('big_win');
                                bigwin.animations.play('big_win', 20, true);
                                var confetti = tokensState.add.sprite(0, 0, 'confetti');
                                confetti.animations.add('hurray');
                                confetti.animations.play('hurray', 15, false);
                                setTimeout(function(){
                                    game.add.audio('crowd').play();
                                },500);
                            }
                        })
                    }
                });
            }
        });

        button_1.inputEnabled = true;
        button_1.events.onInputDown.add(function(element){ 
            setTokensToPlay(button_1, tokensToText); 
            buttonBehaviorDown(element);
        });
        button_1.events.onInputOver.add(function(element){ buttonBehaviorOver(element); });
        button_1.events.onInputOut.add(function(element){ buttonBehaviorOut(element); });

        button_10.inputEnabled = true;
        button_10.events.onInputDown.add(function(element){ 
            setTokensToPlay(button_10, tokensToText); 
            buttonBehaviorDown(element);
        });
        button_10.events.onInputOver.add(function(element){ buttonBehaviorOver(element); });
        button_10.events.onInputOut.add(function(element){ buttonBehaviorOut(element); });

        button_50.inputEnabled = true;
        button_50.events.onInputDown.add(function(element){ 
            setTokensToPlay(button_50, tokensToText); 
            buttonBehaviorDown(element);
        });
        button_50.events.onInputOver.add(function(element){ buttonBehaviorOver(element); });
        button_50.events.onInputOut.add(function(element){ buttonBehaviorOut(element); });

        button_250.inputEnabled = true;
        button_250.events.onInputDown.add(function(element){ 
            setTokensToPlay(button_250, tokensToText); 
            buttonBehaviorDown(element);
        });
        button_250.events.onInputOver.add(function(element){ buttonBehaviorOver(element); });
        button_250.events.onInputOut.add(function(element){ buttonBehaviorOut(element); });


    }
};

function buttonBehaviorOver(element){
    element.animations.add('hover',[0,1,2]);
    element.animations.play('hover', 20, false);
}

function buttonBehaviorOut(element){
    element.animations.add('hover',[2,1,0]);
    element.animations.play('hover', 20, false);
}

function buttonBehaviorDown(element){
    game.add.audio('click').play();
    element.animations.add('clicked',[3,4,5,6,7]);
    element.animations.play('clicked', 20, false);
    __button_spin.play('aviable', 20, false);
}

function setTokensToPlay(element, tokensToText){
    var tokens = parseInt(element.key.split('_')[1]);
    __tokensToPlay = (tokens + __tokensToPlay) > __userData.tokenBalance ? __userData.tokenBalance : (tokens + __tokensToPlay > 250) ? 250 : (tokens + __tokensToPlay);
    tokensToText.setText(__tokensToPlay);
    tokensToText.x = (__tokensToPlay.toString().length == 3) ? 487 : (__tokensToPlay.toString().length == 2) ? 492 : 497;
    
};

//setting all the game-states
game.state.add('loaderState', loaderState);
game.state.add('bootState', bootState);
game.state.add('tokensState', tokensState);
game.state.start('bootState');

