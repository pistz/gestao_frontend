import { ICourse } from "../Course/Course";
import { IEntity } from "../Entity";

export interface IStudent extends IEntity{
    firstName:string,
    lastName:string,
    email:string,
    courses:ICourse[],
    lists:string[],
}