/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

/// <reference path="control/index.ts" />
/// <reference path="sw/index.ts" />
/// <reference path="common/index.ts" />


angular.module('app', ['ngRoute', 'common', 'control', 'sw', 'ngMaterial', 'ngAria', 'ngAnimate'])

    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/', {
                templateUrl: 'tpl/control.tpl.html'
            })

            .otherwise({
                redirectTo: '/'
            });
    })

    .run((irProgressService) => {
    });