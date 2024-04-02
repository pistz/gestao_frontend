import axios from "axios";
import Repository from "./base/Repository";
import { endpoints } from "../routes/endpoints";
import { IStudent } from "../entities/Student/Student";
import { updateStudentDTO } from "./dto/Student/updateStudentDTO";

const student:string = endpoints.host+endpoints.api+endpoints.students;

export class StudentRepository extends Repository{

    createStudent = async (firstName:string, lastName:string, email:string) =>{
        
        const sendBody = {
            firstName:firstName,
            lastName:lastName,
            email:email
        };

        try {
            const created = await axios.post(student, sendBody);
            return created.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    editStudent = async (dto:updateStudentDTO) =>{
        try {
            await axios.patch(`${student}/${dto.id}`, dto)
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getStudent = async (id:number):Promise<IStudent> =>{
        try {
            const response = await axios.get(`${student}/${id}`);
            return response.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getAllStudents = async ():Promise<IStudent[]> =>{
        try {
            const students = await axios.get(student);
            return students.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    deleteStudent = async (id:string):Promise<void> =>{
        try {
            await axios.delete(`${student}/${id}`)
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }
}
