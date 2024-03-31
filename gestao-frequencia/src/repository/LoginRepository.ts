import axios from "axios";
import Repository from "./base/Repository";

const host:string = 'http://localhost:3001/api/v1/login';
const userHost:string = 'http://localhost:3001/api/v1/users';
export class LoginRepository extends Repository{

    validateUser = async (email:string, pass:string) =>{

        const sendBody = {
            email: email,
            password: pass
        };

        try {
            const result = await axios.post(host,sendBody);
            return result.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getUser = async (id:string) => {
        try {
            const result = await axios.get(`${userHost}/${id}`);
            return result.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }
}