import axios from "axios";
import Repository from "./base/Repository";

const host:string = 'http://localhost:3001/api/v1/school';

export class SchoolRepository extends Repository{

    getAllSchools = async ()=>{
        try {
            const result = await axios.get(host);
            return result.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }
}