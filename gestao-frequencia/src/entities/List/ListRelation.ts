import { ICourse } from "../Course/Course";
import { IEntity } from "../Entity";
import { IStudent } from "../Student/Student";
import { IList } from "./List";

export interface IListRelation extends IEntity{
    studentId:number,
    attendanceListId:string,
    list:IList,
    student:IStudent
    course:ICourse
}