/// <reference path="../index.ts" />

module common {
    export class irProgressService {
        private tpl: JQuery;

        constructor(
            $http: ng.IHttpService,
            $compile: ng.ICompileService,
            $rootScope: ng.IRootScopeService) {

            var tplStr;
            $http.get('/tpl/progressLinear.tpl.html')
                .success((res) => {
                    tplStr = res;
                    this.tpl = $compile(tplStr)($rootScope);
                });
        }

        show(): void {
            $('body').append(this.tpl);
        }

        hide(): void {
            this.tpl.remove();
        }
    }

    registerService('irProgressService', irProgressService);
}