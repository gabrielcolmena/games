// Global variables

var __reward = [],
    __collision = 0,
    __tokensToPlay = 0,
    __peg = [],
    __tokensToPlayJSON = {},
    __crowdSound = null,
    __fallSound = null,
    __tickSound = null,
    __winningSound = null,
    __epxplosionSound = null,
    __soundEneabled = true;

//get user data from the api
var __userData = getUserData(1000);

var game = new Phaser.Game(560, 400, Phaser.CANVAS, 'Crazy-pegs');

//Preload 'loading' images
var bootState = {

    preload: function(){

        this.load.image('background', './assets/bg.png');
        this.load.spritesheet('loading', './assets/sprites/Loading/loading.png', 109, 100, 30);

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
        var load = this.add.sprite(game.width / 2  - 52, game.height / 2 - 50, 'loading');
        load.animations.add('loading');
        load.animations.play('loading', 15, true);

        //loaging images
        this.load.image('ball_01', './assets/ball_01.png');
        this.load.image('ball_10', './assets/ball_10.png');
        this.load.image('ball_40', './assets/ball_40.png');
        this.load.image('ball_250', './assets/ball_250.png');
        this.load.image('crazypegs', './assets/crazypegs.png');
        this.load.image('points_icon','./assets/points_icon.png');
        this.load.image('tokens_icon','./assets/tokens_icon.png');
        this.load.image('panel_points','./assets/panel_points.png');
        this.load.image('panel_ball', './assets/panel_ball.png');
        this.load.image('peg', './assets/peg.png');
        this.load.image('ball', './assets/ball_250.png');
        this.load.image('big_board','./assets/board.png');
        this.load.image('board', './assets/token_board.png');
        this.load.image('tokens_big', './assets/tokens_big.png');
        this.load.image('points_big', './assets/points_big.png');
        this.load.image('cash','./assets/sprites/Cash/cash.png');
        this.load.image('crown','./assets/sprites/Crown/crown.png');
        this.load.image('sound_on', './assets/sound_on.png');
        this.load.image('sound_off', './assets/sound_off.png');

        //loading sprites
        this.load.spritesheet('bigBall_01', './assets/sprites/1/token_1.png', 37, 36, 7);
        this.load.spritesheet('bigBall_10', './assets/sprites/10/token_10.png', 50, 50, 7);
        this.load.spritesheet('bigBall_40', './assets/sprites/40/token_40.png', 60, 61, 7);
        this.load.spritesheet('bigBall_250', './assets/sprites/250/token_250.png', 76, 76, 7);
        this.load.spritesheet('confetti', './assets/sprites/Confetti/confetti.png', 560, 400, 30)
        this.load.spritesheet('number', './assets/sprites/Numbers/n.png', 51, 59, 10);
        this.load.spritesheet('cleanButton', './assets/clean.png', 97, 33, 6);
        this.load.spritesheet('again', './assets/again.png', 147, 33, 10);
        this.load.spritesheet('playButton', './assets/play.png', 220, 39, 6);
        this.load.spritesheet('start', './assets/start.png', 97, 33, 6);
        this.load.spritesheet('life', './assets/sprites/Distort_Life/life.png', 560, 400, 8);
        this.load.spritesheet('movingBack', './assets/sprites/Distort_Life/life.png', 560, 400, 8);
        this.load.spritesheet('pig', './assets/sprites/Pig/pig.png', 39, 35, 15);
        this.load.spritesheet('diamond', './assets/sprites/Diamond/diamond.png', 29, 31, 45);
        this.load.spritesheet('coins', './assets/sprites/Coins/coins.png', 34, 39, 45);
        this.load.spritesheet('teddy', './assets/sprites/Teddy/teddy.png', 42, 44, 45);
        this.load.spritesheet('cup', './assets/sprites/Cup/cup.png', 41, 43, 45);
        this.load.spritesheet('Black','./assets/sprites/Boxes/Black/black_box.png',44, 37, 30);
        this.load.spritesheet('Blue','./assets/sprites/Boxes/Blue/blue_box.png',44, 38, 30);
        this.load.spritesheet('Green','./assets/sprites/Boxes/Green/green_box.png',44, 38, 30);
        this.load.spritesheet('Pink','./assets/sprites/Boxes/Pink/pink_box.png',44, 38, 30);
        this.load.spritesheet('Red','./assets/sprites/Boxes/Red/red_box.png',44, 38, 30);
        this.load.spritesheet('Violet','./assets/sprites/Boxes/Violet/violet_box.png',43, 38, 30);
        this.load.spritesheet('Yellow','./assets/sprites/Boxes/Yellow/yellow_box.png',44, 38, 30);
        this.load.spritesheet('poison', './assets/sprites/Poison/poison.png', 26, 38, 23);
        this.load.spritesheet('treasure', './assets/sprites/Treasure/treasure.png', 54, 44, 45);
        this.load.spritesheet('bag', './assets/sprites/Bag/bag.png', 31, 40, 16);
        this.load.spritesheet('winning_jackpot', './assets/winnings/Jackpot/jackpot.png', 277, 273, 40);
        this.load.spritesheet('winning_cash', './assets/winnings/Cash/winning_cash.png',245, 230, 30);
        this.load.spritesheet('winning_crown', './assets/winnings/Crown/winning_crown.png', 272, 200, 35);
        this.load.spritesheet('winning_pig', './assets/winnings/Pig/winning_pig.png', 297, 213, 44);
        this.load.spritesheet('winning_diamond', './assets/winnings/Diamond/winning_diamond.png', 288, 200, 44);
        this.load.spritesheet('winning_coins', './assets/winnings/Coins/winning_coins.png', 202, 264, 44);
        this.load.spritesheet('winning_teddy', './assets/winnings/Teddy/winning_teddy.png', 262, 265, 44);
        this.load.spritesheet('winning_cup', './assets/winnings/Cup/winning_cup.png', 342, 315, 37);
        this.load.spritesheet('winning_q_box', './assets/winnings/Box/winning_box.png', 253, 254, 45);
        this.load.spritesheet('winning_poison', './assets/winnings/Poison/winning_poison.png', 206, 223, 44);
        this.load.spritesheet('winning_treasure', './assets/winnings/Treasure/winning_treasure.png', 420, 272, 20);
        this.load.spritesheet('winning_bag', './assets/winnings/Bag/winning_bag.png', 200, 314, 25);
        this.load.spritesheet('arrow', './assets/arrow.png', 14, 26, 10);
        this.load.spritesheet('explosion', './assets/sprites/Explosion/explosion.png', 139, 73, 49);

        //loading physics
        this.load.physics('crazyPhysic', './assets/crazypegs.json');
        this.load.physics('boardPhysics', './assets/board.json');

        //loading sounds
        this.load.audio('crowd', './assets/audios/crowd.mp3');
        this.load.audio('fall', './assets/audios/fall.mp3');
        this.load.audio('tick', './assets/audios/tick.mp3');
        this.load.audio('winning', './assets/audios/winning.mp3');
        this.load.audio('explosion', './assets/audios/explosion.mp3');

    },
    create: function(){

        //moving to the first gameplay state
        game.state.start('initstate');

    },
}

var initstate = {

    ballsArray : ['ball_01','ball_10','ball_40','ball_250'],

    create: function(){

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.add.image(0, 0, 'background');

        var button = this.add.sprite(game.width / 2 - 40, 260, 'start');
        button.animations.add('click');

        this.physics.p2.gravity.y = 1000;
        this.physics.p2.restitution = .7;
     
        var crazypegs = this.add.sprite(game.width / 2, game.height / 2, 'crazypegs');

        //putting pegs 
        var peg = this.add.sprite(80, game.height / 2, 'peg');
        this.physics.p2.enable(peg, false);
        peg.body.static = true;
        peg.body.setCircle(7.5);

        peg = this.add.sprite(470, game.height / 2, 'peg');
        this.physics.p2.enable(peg, false);
        peg.body.static = true;
        peg.body.setCircle(7.5);

        var balls = this.add.physicsGroup(Phaser.Physics.P2JS);
        var ball;

        //creating the 4 balls bouncing on the stage
        for(var i = 0; i < this.ballsArray.length; i++){
            ball = balls.create(i + (game.width / 2), 20, this.ballsArray[i]);
            this.physics.p2.enable(ball, Phaser.Physics.p2);    
            ball.body.damping = 0.0;
            ball.body.setCircle(13.5);
        }

        //setting the polygon form on the main letters
        this.physics.p2.enable(crazypegs, false);
        crazypegs.body.static = true;
        crazypegs.body.clearShapes();
        crazypegs.body.loadPolygon('crazyPhysic', 'crazypegs');

        //setting the event for the start button
        button.inputEnabled = true;
        button.events.onInputDown.add(function(){
            button.animations.play('click', 15, false);
            setTimeout(function(){
                game.state.start('tokensState');
            }, 500);
        }, this);
    }
};

var tokensState = {
    
    //object for the buttons data
    buttonsData: {
            keys: ["cleanButton", "playButton"],
            position: {
                x: [100, 240],
                y: [308.2, 305]
            }
        },

    //object for the balls data
    ballsData: {
            keys: ['bigBall_01','bigBall_10','bigBall_40','bigBall_250'],
            position: {
                x: [108, 178, 262, 355],
                y: [204, 190, 180, 165]
            }
    },

    //object for the big icons data
    bigIconsData: {
            keys: ['tokens_big', 'points_big'],
            text: ['TOKENS', 'POINTS'],
            position: {
                x: [110, 320],
                y: [55, 55]
            }
    },

    create: function(){

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.add.image(0, 0, 'background');

        var board = this.add.sprite(80, 230, 'board');

        //setting the buttons on the screen
        var buttons = this.add.group();
        var button = [];
        for(var i = 0; i < this.buttonsData.keys.length; i++){
            button[i] = buttons.create(this.buttonsData.position.x[i], this.buttonsData.position.y[i], this.buttonsData.keys[i]);
            button[i].inputEnabled = true;
        }

        //putting needed text on the stage
        var style = { font: "16px Montserrat", fill: "#000"};
        var text = this.add.text(180, 252, 'TOKENS TO PLAY = ', style);
        style = {font: '30px Montserrat', fill: "#FFF"};
        text = this.add.text(180, 62, __userData.tokens, style);
        text = this.add.text(389, 62, __userData.points, style);
        style = { font: "16px Montserrat", fill: "#d41866"};
        var dynamicText = this.add.text(340, 252, '0', style);

        //setting the events for the buttons
        button[0].events.onInputDown.add(function(){
                button[0].animations.add('click');
                button[0].animations.play('click', 15, false);
                dynamicText.destroy();
                dynamicText = this.add.text(340, 252, '00', style);
            }, this);

        button[1].events.onInputDown.add(function(){
                button[1].animations.add('click');
                button[1].animations.play('click', 15, false);

                setTimeout(function(){
                    if(parseInt(dynamicText._text)){
                        if(__userData.tokens >= parseInt(dynamicText._text)){
                            __tokensToPlay = parseInt(dynamicText._text);
                            __tokensToPlayJSON = playGame(1000, __tokensToPlay);    
                            game.state.start('gamePlayState');
                        }else{
                            alert("You don't have that much tokens");
                        }
                    }
                    else
                        alert('You should select some tokens to play');
                },500);
            }, this);

        //putting the tokens balls on the screen
        var balls = this.add.group();
        var ball = [];
        for(var i = 0; i < this.ballsData.keys.length; i++){
            ball[i] = balls.create(this.ballsData.position.x[i], this.ballsData.position.y[i], this.ballsData.keys[i]);
            ball[i].inputEnabled = true;
            ball[i].animations.add('stay', [0,1]);
            ball[i].animations.play('stay', 15, true);
            ball[i].events.onInputOver.add(function(target){
                target.animations.add('over', [1, 2, 3]);
                target.animations.play('over', 10, true);
            }, this);
            ball[i].events.onInputOut.add(function(target){
                target.animations.play('stay');
            }, this);
            ball[i].events.onInputDown.add(function(target){
                target.animations.add('click',[3, 4, 5, 6, 7, 0]);
                target.animations.play('click', 10, false);
                var currentText = parseInt(dynamicText.text);
                dynamicText.destroy();
                var amount = parseInt(target.key.split('_')[1]);
                amount+= currentText;
                if(amount <= 250)
                    dynamicText = this.add.text(335, 252, amount, style);
                else if(amount > 250)
                    dynamicText = this.add.text(335, 252, '250', style);
                else
                    dynamicText = this.add.text(335, 252, currentText, style);
            }, this);
        }

        var bigIcons = this.add.group();
        for(var i = 0; i < this.bigIconsData.keys.length; i++){
            var bigIcon = bigIcons.create(this.bigIconsData.position.x[i], this.bigIconsData.position.y[i], this.bigIconsData.keys[i]);
            style = {font: '15px Montserrat', fill: "#EF0047"};
            this.add.text(this.bigIconsData.position.x[i] + 70, this.bigIconsData.position.y[i] + 40, this.bigIconsData.text[i], style);
        }
    }
};

var gamePlayState = {
    
    map: [//position of all pegs
        [0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0]
        ],

    boxesKeys: ['Green', 'Red', 'Yellow', 'Pink', 'Blue', 'Violet', 'Black'],

    create: function(){

        //initializing variables
        __collision = 0;

        //creating the sound objects 
        __crowdSound = game.add.audio('crowd')
        __fallSound = game.add.audio('fall')
        __tickSound = game.add.audio('tick')
        __winningSound = game.add.audio('winning')
        __epxplosionSound = game.add.audio('explosion')

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);

        this.add.image(0, 0, 'background');

        var sound_on = this.add.image(5, 5, 'sound_on');
        var sound_off = this.add.image(5, 20, 'sound_off');
        sound_off.alpha = 0;
        sound_on.inputEnabled = true;
        sound_on.events.onInputDown.add(function(target){
            __soundEneabled = false;
            sound_off.alpha = 1;
            target.alpha = 0;
        }, this);

        sound_off.inputEnabled = true;
        sound_off.events.onInputDown.add(function(target){
            __soundEneabled = true;
            sound_on.alpha = 1;
            target.alpha = 0;
        }, this);

        //putting the UI elements on the stage
        var uiElements = this.add.group();
        uiElements.create(0 + 168, 0 + 12, 'tokens_icon');
        uiElements.create(40 + 168, 8 + 12, 'panel_points');
        uiElements.create(100 + 168, 0 + 12, 'points_icon');
        uiElements.create(140 + 168, 8 + 12, 'panel_points');
        uiElements.create(495, 12, 'panel_ball');

        //putting needed the text on the stage
        var style = { font: "10px Montserrat", fill: "#fff"};
        var text = this.add.text(318, 5, 'POINTS', style);
            text = this.add.text(220, 5, 'TOKENS', style);
//            text = this.add.text(220, 25, __tokensToPlayJSON.tokensPlayed, style);
            text = this.add.text(220, 25, __userData.tokens, style);
//            text = this.add.text(318, 25, __tokensToPlayJSON.totalPoints, style);
            text = this.add.text(318, 25, __userData.points, style);

        // putting the pointing arrow on the stage
        var arrow = this.add.sprite(512, 75, 'arrow');
        arrow.scale.y *= -1;
        arrow.animations.add('animate');
        arrow.animations.play('animate', 15, true);

        //putting the board and setting polygon physics
        var board = this.add.sprite(275, 385, 'big_board');
        this.physics.p2.enable(board, Phaser.Physics.p2);
        board.body.static = true;
        board.body.clearShapes();
        board.body.loadPolygon('boardPhysics', 'big_board');

        //gravity for the gameplayState
        this.physics.p2.gravity.y = 700;
        this.physics.p2.restitution = .75;

        //Putting and setting the rewards on the stage
        var rewards = this.add.physicsGroup(Phaser.Physics.P2JS);
        var boxes = this.add.group();
        for(var i = 0; i < 7; i++){
            __reward[i] = rewards.create(parseInt(i+1) * 68, 355, this.boxesKeys[i]);
            this.physics.p2.enable(__reward[i], Phaser.Physics.p2);
            __reward[i].animations.add('animate');
            __reward[i].animations.play('animate', 15, true);   
        }

        //Putting all the pegs around the stage
        var pegs = this.add.physicsGroup(Phaser.Physics.P2JS);
        var k  = 0;
        for(var i = 0; i < this.map.length; i++)
            for(var j = 0; j < this.map[0].length; j++)
                if(this.map[i][j]){
                    __peg[k] = pegs.create(parseInt(j * 24) + 15, parseInt(i * 45) + 100, 'peg');  
                    this.physics.p2.enable(__peg[k], Phaser.Physics.p2);
                    __peg[k].body.static = true;
                    __peg[k].body.setCircle(8);
                k++;
            }

        //Selecting the correct ball, according to the selected tokens
        var ballKey = '';
        if(__tokensToPlay > 0 && __tokensToPlay < 10)
            ballKey = 'ball_01';
        else if(__tokensToPlay >= 10 && __tokensToPlay < 40)
            ballKey = 'ball_10';
        else if(__tokensToPlay >= 40 && __tokensToPlay < 249)
            ballKey = 'ball_40';
        else
            ballKey = 'ball_250';

        //putting and setting the ball 
        var ball = this.add.sprite(504, 20, ballKey);
        ball.inputEnabled = true;
        ball.input.enableDrag(true);
        ball.input.allowVerticalDrag = false;
        ball.events.onDragStop.add(function(body){
            if(__soundEneabled)__fallSound.play();
            this.physics.p2.enable(body, Phaser.Physics.p2);
            ball.body.collideWorldBounds = true;
            body.body.setCircle(14);
            ball.inputEnabled = false;
            for(var i = 0; i < __reward.length; i++){
                ball.body.createBodyCallback(__reward[i], this.hittingReward, this);    
            }
            for(var i = 0; i < __peg.length; i++){
                ball.body.createBodyCallback(__peg[i], this.hittingPeg, this);    
            }
        }, this);
    },

    //event for the collisions between ball and reward
    hittingReward: function(body, body2){ 
        if(!__collision){   
            __epxplosionSound.play();
            __collision++;
            body2.sprite.loadTexture('explosion');
            body2.sprite.animations.add('explosion');
            body2.sprite.animations.play('explosion', 15, false);
            body.sprite.alpha = 0;
            body.destroy();   
            setTimeout(function(){
                game.state.start('winningState');
            }, 2000);
        }
    },

    //event for the collisions between ball and any peg
    hittingPeg: function(collision, body){
        if(__soundEneabled)__tickSound.play();
    }
};

var winningState = {

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

    //keys for the final animation
    rewardsArray: [
        'pig','poison','teddy','cash','bag','coins','diamond','crown','treasure','cup'
    ],

    //points according the playId
    prizesTable: [2, 4, 8, 10, 25, 100, 250, 500, 2500, 5000],

    create: function(){

        this.add.image(0, 0, 'background'); 

        //in case of playId == 10
        if(this.rewardsArray[__tokensToPlayJSON.playId] == 'cup'){

            var jackpot = this.add.sprite(game.world.centerX , 20, 'winning_jackpot');
            jackpot.animations.add('jack');
            jackpot.animations.play('jack', 15, true);

            var confetti = this.add.sprite(0, 0, 'confetti');
            confetti.animations.add('hurray');
            confetti.animations.play('hurray', 15, true);
            if(__soundEneabled)__crowdSound.play();
            var winner = this.add.sprite(10 , 45, 'winning_' + this.rewardsArray[__tokensToPlayJSON.playId]);

        }else{
            if(__soundEneabled)__winningSound.play();
            var winner = this.add.sprite(game.world.centerX, game.world.centerY - 80, 'winning_' + this.rewardsArray[__tokensToPlayJSON.playId]);
            winner.anchor.setTo(0.5);
        }

        //var amount = this.prizesTable[__tokensToPlayJSON.playId];
	var amount = __tokensToPlayJSON.totalPoints;
        var n = ("" + amount).split("");
        for(var i = 0; i < amount.toString().length; i++){
            var number = this.add.sprite((parseInt(i * 52) + game.world.centerX) - (25 * (n.length)), game.world.centerY + 45, 'number');
            number.animations.add('animation', this.numbersArray[parseInt(n[i])]);
            number.animations.play('animation', 20, false);
        }

        winner.scale.set(.85, .85);
        winner.animations.add('animate');
        winner.animations.play('animate', 15, true);
        
        var button = this.add.sprite(game.width / 2 - 72, 310, 'again');
        button.animations.add('click');

        button.inputEnabled = true;
        button.events.onInputDown.add(function(){
            button.animations.play('click', 15, false);
            setTimeout(function(){
                game.state.start('tokensState');
                //Reload the frame to recall the userdata to get updated s.
		          //location.reload();
                __userData = getStartData(1000);
            }, 500);
        }, this);
    }
};


//setting all the game-states
game.state.add('loaderState', loaderState);
game.state.add('bootState', bootState);
game.state.add('tokensState', tokensState);
game.state.add('initstate', initstate);
game.state.add('gamePlayState', gamePlayState);
game.state.add('winningState', winningState);
game.state.start('bootState');
