import { IStudent } from "../../../../entities/Student/Student";

export default interface IListActionsProps<T extends IStudent>{
    listQueryKey:string;
    getAllEntities():Promise<T[]>;
    deleteEntity(id:string):Promise<void>;
    editEntity?(entity:T):Promise<void>;
}