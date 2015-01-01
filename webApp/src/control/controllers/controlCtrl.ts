module control {
    export class ControlCtrl {

        constructor($scope: IControlScope, $mdToast) {
            var switchNum = 4;

            $scope.switches = [];

            for (var i = 0; i < switchNum; i++) {
                var sw = new Switch();
                sw.name = 'Switch ' + i;
                if (Math.round(Math.random()))
                    sw.value = true;
                else
                    sw.value = false;

                $scope.switches.push(sw);
            }

            $scope.onSwChange = (sw) => {
                var toast = $mdToast.simple()
                    .content(sw.name + ' = ' + sw.value)
                    .action('OK')
                    .highlightAction(false)
                    //.position('bottom right');
                $mdToast.show(toast).then(function () {
                    //alert('You clicked \'OK\'.');
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
}