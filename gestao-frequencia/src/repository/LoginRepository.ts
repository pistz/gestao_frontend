import axios from "axios";
import Repository from "./base/Repository";
import { endpoints } from "../routes/endpoints";

const login:string = endpoints.host+endpoints.api+endpoints.login;
const user:string = endpoints.host+endpoints.api+endpoints.users;
export class LoginRepository extends Repository{

    validateUser = async (email:string, pass:string) =>{

        const sendBody = {
            email: email,
            password: pass
        };

        try {
            const result = await axios.post(login,sendBody);
            return result.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getUser = async (id:string) => {
        try {
            const result = await axios.get(`${user}/${id}`);
            return result.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }
}