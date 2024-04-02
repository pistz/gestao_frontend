import { ICourse } from "../Course/Course";
import { IEntity } from "../Entity";
import { IList } from "../List/List";

export interface IStudent extends IEntity{
    firstName:string,
    lastName:string,
    email:string,
    courses:ICourse[],
    lists:IList[],
}