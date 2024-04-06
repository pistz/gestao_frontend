
import { IList } from "../../../../entities/List/List";

export interface IListRelationProps<T extends IList>{
    listQueryKey:string;
    getAllEntities():Promise<T[]>;
    deleteEntity(id:string):Promise<void>;
    editEntity?(entity:T):Promise<void>;
}