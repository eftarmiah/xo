'use strict';

var services = angular.module('xo.services.auth',[]);

services.factory("loginService", ["$firebase", function() {
    var ref = new Firebase("https://boiling-fire-5393.firebaseio.com/game/xos");

    var LoginService = {

        login: function(email, password, callback) {
            ref.authWithPassword({
                email : email,
                password: password
            }, callback);
        },

        logout: function() {
            ref.unauth();
        },

        isLoggedIn: function() {
            return !!ref.getAuth();
        }

    };


    return LoginService;
}]);