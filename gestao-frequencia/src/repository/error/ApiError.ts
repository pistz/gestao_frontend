export default class ApiError{
    readonly errors:string[];

    constructor(errors:string[]){
        this.errors = errors;
    }
}