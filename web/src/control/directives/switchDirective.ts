/// <reference path="../index.ts" />

module control {
    export function switchDirective(): ng.IDirective {
        return {
            restrict: 'E',
            template: '<div>switch</div>',
            replace: true,
            link: () => {

            }
        }
    }

    registerDirective('switch', switchDirective);
}