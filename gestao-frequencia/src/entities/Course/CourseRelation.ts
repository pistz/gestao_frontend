import { IEntity } from "../Entity";
import { IStudent } from "../Student/Student";
import { ICourse } from "./Course";
export interface ICourseRelation extends IEntity{
    studentId:number,
    courseId:string,
    course:ICourse,
    student:IStudent,
}