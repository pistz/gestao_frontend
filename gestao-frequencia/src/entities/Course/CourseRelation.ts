import { IEntity } from "../Entity";
import { IStudent } from "../Student/Student";
import { ICourse } from "./Course";
export interface ICourseRelation extends IEntity, IStudent, ICourse{
    studentId:number,
    courseId:string,
    courseName:ICourse['name'],
    studentName:IStudent['firstName'],
    studentLastName:IStudent['lastName']
}