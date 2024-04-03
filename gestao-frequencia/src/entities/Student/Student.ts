import { ICourseRelation } from "../Course/CourseRelation";
import { IEntity } from "../Entity";
import { IListRelation } from "../List/ListRelation";

export interface IStudent extends IEntity{
    firstName:string,
    lastName:string,
    email:string,
    courses:ICourseRelation[],
    lists:IListRelation[],
}