/**
 * Created by bnelson on 6/9/16.
 *
 *
 * This file contains the functions required to communicate with the Game API for Snowfly Games
 *
 *
 */

/**
 * Routes
 */


var getUserDataRoute = "http://crayfish.snowfly.com/gameapi/getUserInfo";
//var getUserDataRoute = "http://localhost/gameapi/getUserInfo";

var playGameRoute = "http://crayfish.snowfly.com/gameapi/playTokens";


/**
 * getUserData
 *
 * Input - GameId : The id of the game. For Demo purposes use 1000
 *
 * Output - A JSON string containing:
 *          User Name
 *          Company Name
 *          Token Balance
 *          Point Balance
 *
 *          Example Output:
 *
 *          {"userName":"DEMO","companyName":"DEMO COMPANY","graphics":{"logo":"http://crayfish.snowfly.com/themes/phoenix/assets/images/snowfly/logo/SnowflyLogo_green.png","tag2":"graphic2..."},"tokens":100,"points":2000}
 *
 */

function getUserData(gameId){
    //Todo: Make Asynchronous
    //$.post("http://crayfish.snowfly.com/gameapi/getUserInfo", { gameId: gameId })
    //    .done(function( data ) {
    //        return JSON.parse(data);
    //    });

    if(!gameId){
        alert('Need Game ID for getUserData');
        return;
    }

    var foo =$.ajax({
        type: 'POST',
        url: getUserDataRoute,
        data: { gameId: gameId },
        async:false
    });
    return JSON.parse(foo.responseText);

}


/**
 * getUserData
 *
 * Input - GameId : The id of the game. For Demo purposes use 1000
 *         TokensPlayed : The amount of tokens played by the user
 *
 * Output - A JSON string containing:
 *          Tokens Played
 *          Total Points Won
 *          Play Id
 *          
 *          Example Output:
 *
 *          {"tokensReceived":1,"totalPoints":32,"playId":3}
 *
 */

function playGame(gameId, tokensPlayed){
    //Todo: Make Asynchronous
    //$.post("http://crayfish.snowfly.com/gameapi/playTokens", { tokens: tokensPlayed, gameId: gameId })
    //    .done(function( data ) {
    //        return JSON.parse(data);
    //    });

    if(!gameId){
        alert('Need Company ID for playGame');
        return;
    }

    var foo =$.ajax({
        type: 'POST',
        url: playGameRoute,
        data: { tokens: tokensPlayed, gameId: gameId },
        async:false
    });
    return JSON.parse(foo.responseText);


}



