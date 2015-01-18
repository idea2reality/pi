/// <reference path="../interfaces/iswitch.ts" />

module sw {
    export class Switch implements ISwitch {
        _id: string;
        name: string;

        value: boolean;
        isDisabled: boolean;

        private http: ng.IHttpService;

        constructor(swData: ISwitch) {
            $.extend(this, swData);

            this.value = false;
            this.isDisabled = false;

            this.http = angular.injector(['ng']).get('$http');
        }

        fetch(callback?: (sw: Switch) => void): Switch {
            this.http.get('/sw/' + this._id)
                .success((res: any) => {
                    var err = res.err;
                    var data = res.data;

                    if (err) return console.error(err);

                    $.extend(this, data);

                    if (callback)
                        callback(this);
                });

            return this;
        }
    }
} 