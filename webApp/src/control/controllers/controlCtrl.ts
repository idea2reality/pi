/// <reference path="../index.ts" />

module control {
    import Switch = sw.Switch;

    export class ControlCtrl {

        constructor(
            $scope: IControlScope,
            $mdToast, controlService:
            ControlService,
            swService: SwService,
            irProgressService: common.irProgressService) {
            var switchNum = 4;

            $scope.switches = swService.list();

            $scope.onSwChange = (sw) => {
                sw.isDisabled = true;
                irProgressService.show();

                controlService.control(sw._id, sw.value, (result) => {
                    irProgressService.hide();

                    var toast = $mdToast.simple()
                        .action('OK')
                        .highlightAction(false);

                    if (result.err) {
                        toast.content('FAIL');

                        setTimeout(() => {
                            sw.value = !sw.value;
                            sw.isDisabled = false;

                            $scope.$apply();
                        }, 500);
                    } else {
                        toast.content('SUCCESS');
                        sw.isDisabled = false;
                    }

                    $mdToast.show(toast);
                });
            };
        }
    }

    export interface IControlScope extends ng.IScope {
        switches: Switch[];

        onSwChange(sw: Switch): void;
    }

    registerController('controlCtrl', ControlCtrl);
}