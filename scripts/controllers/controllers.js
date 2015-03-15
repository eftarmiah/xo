'use strict';
var xoApp = angular.module("xo",["ngRoute","xo.services"]);

xoApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/views/game.html",
            controller: "GameController"
        })

});

xoApp.controller("GameController", ["$scope", "gameService", function($scope, gameService) {

    $scope.newGame = function () {
        gameService.newGame(function(game){
            $scope.game = game;
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

        if (gameService.checkForWinner($scope.game.board).won) {
            $scope.game.winner = $scope.game.turn;
            $scope.message = $scope.game.turn + " Wins!";
        } else {
            //next turn
            $scope.game.turn = $scope.game.turn == "x" ? "o":"x";
            $scope.game.moves++;
            $scope.message = $scope.game.turn +"'s move"
        }
        if ($scope.game.moves >= 9) {
            $scope.message = "Game is a draw!";
            $scope.game.winner = "none";
        }
        gameService.save($scope.game);

    };

    //start new game
    $scope.newGame();

}]);
