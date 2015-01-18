/// <reference path="models/switch.ts" />
/// <reference path="interfaces/iswitch.ts" />
/// <reference path="../index.ts" />

module sw {
    var ngModuleName = 'sw';

    var modules = ['ngMaterial', 'ngAria', 'ngAnimate'];

    angular.module(ngModuleName, modules);

    export function registerController(controllerName: string, controllerClass: IClass) {
        angular.module(ngModuleName)
            .controller(controllerName, controllerClass);
    }

    export function registerService(serviceName: string, serviceClass: IClass) {
        angular.module(ngModuleName)
            .service(serviceName, serviceClass);
    }

    export function registerDirective(directiveName: string, directiveFunction: (...services) => ng.IDirective) {
        angular.module(ngModuleName)
            .directive(directiveName, directiveFunction);
    }

    export interface IClass {
        new (...param);
    }
}
