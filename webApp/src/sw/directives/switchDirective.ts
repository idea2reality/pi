/// <reference path="../index.ts" />

module sw {
    export function switchDirective(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: 'tpl/switchDirective.tpl.html',
            replace: true,
            link: () => {

            }
        }
    }

    registerDirective('switch', switchDirective);
}