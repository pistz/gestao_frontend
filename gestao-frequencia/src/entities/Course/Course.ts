import { IEntity } from "../Entity";
import { ISchool } from "../School/School";

export interface ICourse extends IEntity{
    name:string,
    startingYear:number,
    schoolId:string,
    school:ISchool
}