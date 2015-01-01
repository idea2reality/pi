/// <reference path="controllers/controlctrl.ts" />
/// <reference path="services/controlservice.ts" />

module control {
    angular.module('control', ['ngMaterial'])
        .factory('controlService', ($http) => new controlService($http))
        .controller('controlCtrl', ControlCtrl);
}
