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
        if($scope.isGameComplete()) {
            return;
        }

        if(!$scope.isPositionFree(position)) {
            return;
        }

        $scope.makeMove($scope.turn, position);

        if ($scope.checkForWinner()) {
            $scope.winner = $scope.turn;
            $scope.message = $scope.turn + " Wins!";
        } else {
            $scope.turn = $scope.turn == "x" ? "o":"x";
            if ($scope.isGameDraw()) {
                $scope.message = "Game is a draw!";
            } else {
                $scope.message = $scope.turn +"'s move";
            }
        }

    };

    $scope.isPositionFree = function (position){
        return $scope.board[position] === "";
    };

    $scope.isGameComplete = function () {
        return $scope.winner !== null
    };

    $scope.makeMove = function(turn, position) {
        $scope.board[position] = turn;
        $scope.moves++;
    };

    $scope.isGameDraw = function () {
        return $scope.moves >= 9;
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
