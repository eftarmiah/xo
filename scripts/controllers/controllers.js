var noughtsAndCrosses = angular.module("NoughtsAndCrosses",["firebase"]);

noughtsAndCrosses.controller("MainController", ["$scope","$firebase", function($scope, $firebase) {

    var ref = new Firebase("https://boiling-fire-5393.firebaseio.com/game/xos");
    var sync = $firebase(ref);
    $scope.games = sync.$asArray();

    $scope.winningMoves = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];

    $scope.newGame = function() {
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
        $scope.games.$add(data).then(function (ref) {
            $scope.game = $scope.games.$getRecord(ref.key())
        });
    };

    $scope.play = function(position){

        //check if the position has already been played
        if($scope.game.board[position] !== "") {
            return;
        }

        //exit if someone has won
        if($scope.game.winner !== "") {
            return;
        }

        $scope.game.board[position] = $scope.game.turn;

        if ($scope.checkForWinner()) {
            $scope.game.winner = $scope.game.turn;
            $scope.message = $scope.game.turn + " Wins!";
        } else {
            //next turn
            $scope.game.turn = $scope.game.turn == "x" ? "o":"x";
            $scope.game.moves++;
            $scope.message = $scope.game.turn +"'s move"
        }
        $scope.games.$save($scope.game);

        if ($scope.game.moves >= 9) {
            $scope.message = "Game is a draw!";
        }

    };

    $scope.checkForWinner = function() {
        for (var n=0;n<$scope.winningMoves.length;n++) {
            var winningMove = $scope.winningMoves[n];
            var p1 = $scope.game.board[winningMove[0]];
            var p2 = $scope.game.board[winningMove[1]];
            var p3 = $scope.game.board[winningMove[2]];
            if (p1 === p2 && p2 === p3 && p1 !== "") {
                return true;
            }
        }
        return false;
    };

    //start new game
    $scope.newGame();

}]);
