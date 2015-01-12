/// <reference path="../index.ts" />

module control {
    export class ControlService {
        private http: ng.IHttpService;

        constructor($http) {
            this.http = $http;
        }

        control(switchId: string, value: boolean, callback?: (result) => void) {
            this.http.post('/sw/' + switchId + '/control', { value: value })
                .success((result) => {
                    if (callback)
                        callback(result);
                });
        }
    }

    registerService('controlService', ControlService);
} 