import axios from "axios";
import Repository from "./base/Repository";

const host:string = 'http://localhost:3001/api/v1/login';
export class LoginRepository extends Repository{

    validateUser = async (email:string, pass:string) =>{

        const sendBody = {
            email: email,
            password: pass
        };

        try {
            const result = await axios.post(host,sendBody)
            return result
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }
}