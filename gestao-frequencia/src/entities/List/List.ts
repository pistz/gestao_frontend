import { IEntity } from "../Entity";
import { IStudent } from "../Student/Student";

export interface IList extends IEntity{
    attendanceDate:string,
    courseId:string,
    students:IStudent[]
}