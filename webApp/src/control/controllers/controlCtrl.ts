/// <reference path="../index.ts" />

module control {
    export class ControlCtrl {

        constructor($scope: IControlScope, $mdToast, controlService: ControlService, swService: SwService) {
            var switchNum = 4;

            $scope.switches = swService.list();

            $scope.onSwChange = (sw) => {
                controlService.control(sw._id, sw.value, (result) => {
                    $mdToast.show({
                        templateUrl: 'tpl/toast-template.tpl.html',
                        hideDelay: 6000
                    });
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
                });
            };
        }
    }

    export interface IControlScope extends ng.IScope {
        switches: Switch[];

        onSwChange(sw: Switch): void;
    }

    export class Switch {
        _id: string;
        name: string;
        value: boolean;
    }

    registerController('controlCtrl', ControlCtrl);
}