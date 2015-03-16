'use strict';
var xoApp = angular.module("xo",["ngRoute","xo.services.auth","xo.services.game"]);

xoApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/login.html",
            controller: "LoginController"
        })
        .when("/logout", {
            controller: "LogoutController",
            templateUrl: "views/login.html",
        })
        .when("/games/", {
            templateUrl: "views/games_list.html",
            controller: "GameListController"
        })
        .when("/games/:id", {
            templateUrl: "views/game.html",
            controller: "GameController"
        })

});


xoApp.controller("LoginController", [ "$scope", "$location", "loginService", function($scope, $location, loginService) {

    $scope.email = "eftarmiah@gmail.com";
    $scope.password = $scope.email;
    $scope.message = "";

    if (loginService.isLoggedIn()) {
        $location.path("/games");
    }

    $scope.login= function() {
        loginService.login($scope.email,$scope.password, function (error, authData) {
            if (error) {
                $scope.message = "Login Failed!";
                console.log("Login Failed!", error);
            } else {
                $location.path("/games");
            }
        });
    };

    $scope.logout = function() {
        loginService.logout();
    };


}]);

xoApp.controller("LogoutController",  ["loginService","$location", function(loginService, $location) {
    loginService.logout();
    $location.path("/");
}]);


xoApp.controller("GameListController",  ["gameService", "$scope", "$location", function(gameService, $scope, $location) {
    $scope.games = gameService.findAll();

    $scope.newGame = function () {
        gameService.newGame(function(game){
            $location.path("/games/"+game.$id);
        });
    };
}]);

xoApp.controller("GameController", ["gameService", "$scope", "$location", "$routeParams", function(gameService, $scope, $location, $routeParams) {

    var id = $routeParams["id"];
    $scope.game = gameService.get(id);

    $scope.newGame = function () {
        gameService.newGame(function(game){
            $location.path("/games/"+game.$id);
        });
    };

    $scope.back = function () {
        $location.path("/games/");
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

}]);
