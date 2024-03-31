import axios from "axios";
import Repository from "./base/Repository";

const host:string = 'http://localhost:3001/api/v1/course';

export class CourseRepository extends Repository{

    createCourse = async (name:string, startingYear:number, schoolId:string) =>{

        const sendBody = {
            name:name,
            startingYear:startingYear,
            schoolId:schoolId
        };

        try {
            const created = await axios.post(host, sendBody);
            return created.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }


}