import { IEntity } from "../Entity";

export interface IListRelation extends IEntity{
    astudentId:number,
    attendanceListId:string,
}