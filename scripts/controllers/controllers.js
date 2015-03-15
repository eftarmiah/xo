var noughtsAndCrosses = angular.module("NoughtsAndCrosses",[]);

noughtsAndCrosses.controller("MainController", ["$scope", function($scope) {

    $scope.winningMoves = [];
    $scope.winningMoves[0] = [1,2,3];
    $scope.winningMoves[1] = [4,5,6];
    $scope.winningMoves[2] = [7,8,9];
    $scope.winningMoves[3] = [1,4,7];
    $scope.winningMoves[4] = [2,5,8];
    $scope.winningMoves[5] = [3,6,9];
    $scope.winningMoves[6] = [1,5,9];
    $scope.winningMoves[7] = [3,5,7];

    //resets value on a board
    $scope.newGame = function () {
        $scope.board = [];
        $scope.board[1] = "";
        $scope.board[2] = "";
        $scope.board[3] = "";
        $scope.board[4] = "";
        $scope.board[5] = "";
        $scope.board[6] = "";
        $scope.board[7] = "";
        $scope.board[8] = "";
        $scope.board[9] = "";

        $scope.turn = "x";
        $scope.winner = null;
        $scope.moves = 0; //number of moves made
    };

    $scope.play = function(position){
        console.log(position);

        //check if the position has already been played
        if($scope.board[position] !== "") {
            return;
        }

        //exit if someone has won
        if($scope.winner !== null) {
            return;
        }

        $scope.board[position] = $scope.turn;
        if ($scope.checkForWinner()) {
            $scope.winner = $scope.turn;
            new Notification($scope.turn + " Wins!");
        } else {
            //next turn
            $scope.turn = $scope.turn == "x" ? "o":"x";
            $scope.moves++;
            $scope.message = $scope.turn +"'s move"
        }

        if ($scope.moves >= 9) {
            $scope.message = "Game is a draw!";
        }

    };

    $scope.checkForWinner = function() {
        for (var n=0;n<$scope.winningMoves.length;n++) {
            var winningMove = $scope.winningMoves[n];
            var p1 = $scope.board[winningMove[0]];
            var p2 = $scope.board[winningMove[1]];
            var p3 = $scope.board[winningMove[2]];
            if (p1 === p2 && p2 === p3 && p1 !== "") {
                return true;
            }
        }
        return false;
    };

    //start new game
    $scope.newGame();

}]);
