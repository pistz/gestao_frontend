import { IEntity } from "../Entity";

export interface ICourseRelation extends IEntity{
    studentId:number,
    courseId:string
}