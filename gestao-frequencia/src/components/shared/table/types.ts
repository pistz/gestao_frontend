import type { TableColumnsType } from 'antd';
import { IStudent } from '../../../entities/Student/Student';
import { ICourse } from '../../../entities/Course/Course';
import { IList } from '../../../entities/List/List';

export interface Models {
    IStudent: IStudent,
    ICourse: ICourse,
    IList: IList
}

export type Model = keyof Models;

type Properties<T> = {
    [K in keyof T]: T[K]
}
export type ModelType<T extends Model> = Properties<Models>[T];

export default interface IListActionsProps<T extends Model>{
    listQueryKey:string;
    columns:TableColumnsType<ModelType<T>>;
    getAllEntities():Promise<ModelType<T>[]>;
    deleteEntity(id:string):Promise<void>;
    editEntity?(entity:ModelType<T>):Promise<void>;
    type:T
}