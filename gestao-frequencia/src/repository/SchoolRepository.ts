import axios from "axios";
import Repository from "./base/Repository";
import { endpoints } from "../routes/endpoints";

const school:string = endpoints.host+endpoints.api+endpoints.school;

export class SchoolRepository extends Repository{

    getAllSchools = async ()=>{
        try {
            const result = await axios.get(school);
            return result.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }
}