module control {
    export class controlService {
        http: ng.IHttpService;

        constructor($http) {
            this.http = $http;
        }

        
    }
} 