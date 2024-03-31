import axios from "axios";
import Repository from "./base/Repository";

const host:string = 'http://localhost:3001/api/v1/students';

export class StudentRepository extends Repository{

    createStudent = async (firstName:string, lastName:string, email:string) =>{
        
        const sendBody = {
            firstName:firstName,
            lastName:lastName,
            email:email
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
