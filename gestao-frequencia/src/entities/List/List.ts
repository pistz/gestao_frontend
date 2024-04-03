import { IEntity } from "../Entity";
import { IListRelation } from "./ListRelation";

export interface IList extends IEntity{
    attendanceDate:string,
    courseId:string,
    students:IListRelation[]
}