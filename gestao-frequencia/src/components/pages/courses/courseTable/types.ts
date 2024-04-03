
export interface IListActionsProps<ICourse>{
    listQueryKey:string;
    getAllEntities():Promise<ICourse[]>;
    deleteEntity(id:string):Promise<void>;
    editEntity?(entity:ICourse):Promise<void>;
}