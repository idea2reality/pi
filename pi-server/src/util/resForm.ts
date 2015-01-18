class ResponseForm {
    err: number;        // If 0, no error. Otherwise, there is error
    data: any;

    constructor(err: Error, data: any) {
        if (err)
            this.err = 1;
        else
            this.err = 0;

        this.data = data;
    }
}

export = ResponseForm;