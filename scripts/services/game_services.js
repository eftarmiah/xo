'use strict';

var services = angular.module('xo.services',["firebase"]);

services.factory("gameService", ["$firebase", function($firebase) {
    var winningMoves = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];

    var ref = new Firebase("https://boiling-fire-5393.firebaseio.com/game/xos");
    var games = $firebase(ref).$asArray();

    var GameService = {

        checkForWinner: function(board) {
            for (var n=0;n<winningMoves.length;n++) {
                var p1 = board[winningMoves[n][0]];
                var p2 = board[winningMoves[n][1]];
                var p3 = board[winningMoves[n][2]];
                if (p1 === p2 && p2 === p3 && p1 !== "") {
                    return {
                        won:true,
                        winner: p1
                    };
                }
            }
            return {
                won:false,
                winner: null
            };
        },

        newGame : function(fn) {
            var data = {
                board:{
                    "1":"",
                    "2":"",
                    "3":"",
                    "4":"",
                    "5":"",
                    "6":"",
                    "7":"",
                    "8":"",
                    "9":""
                },
                turn:"x",
                moves:0,
                winner:""
            };
            games.$add(data).then(function (ref) {
                fn(games.$getRecord(ref.key()));
            });
        },

        save: function(game){
            games.$save(game);
        }

    };

    return GameService;
}]);