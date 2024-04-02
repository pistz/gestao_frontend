import { ICourse } from "../../../entities/Course/Course";
import { IList } from "../../../entities/List/List";

export interface updateStudentDTO{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    courses?:ICourse[],
    lists?:IList[]
}