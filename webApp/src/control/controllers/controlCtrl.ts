/// <reference path="../index.ts" />

module control {
    export class ControlCtrl {

        constructor($scope: IControlScope, $mdToast, controlService: ControlService, swService: SwService) {
            var switchNum = 4;

            $scope.switches = swService.list();

            $scope.onSwChange = (sw) => {
                controlService.control(sw.name, sw.value, (result) => {
                    var toast = $mdToast.simple()
                        .action('OK')
                        .highlightAction(false);

                    if (result.err) {
                        toast.content('FAIL');
                        setTimeout(() => {
                            sw.value = !sw.value;
                            $scope.$apply();
                        }, 500);
                    } else {
                        toast.content('SUCCESS')
                    }

                    $mdToast.show(toast).then(() => {
                        //alert('You clicked \'OK\'.');
                    });
                });
            };
        }
    }

    export interface IControlScope extends ng.IScope {
        switches: Switch[];

        onSwChange(sw: Switch): void;
    }

    export class Switch {
        id: string;
        name: string;
        value: boolean;
    }

    registerController('controlCtrl', ControlCtrl);
}