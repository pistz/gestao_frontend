import { ICourseRelation } from "../../../../entities/Course/CourseRelation";

export interface ICourseRelationProps<T extends ICourseRelation>{
    listQueryKey:string;
    getAllEntities():Promise<T[]>;
    deleteEntity(id:string):Promise<void>;
    editEntity?(entity:T):Promise<void>;
}