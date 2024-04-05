import axios from "axios";
import Repository from "./base/Repository";
import { endpoints } from "../routes/endpoints";
import { IStudent } from "../entities/Student/Student";
import { updateStudentDTO } from "./dto/Student/updateStudentDTO";
import { ICourseRelation } from "../entities/Course/CourseRelation";

const student:string = endpoints.host+endpoints.api+endpoints.students;
const enroll:string = endpoints.host+endpoints.api+endpoints.enrollment;
const relations:string = endpoints.host+endpoints.api+endpoints.courseRelation;

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

    enrollStudent = async (studentId:string, courseId:string):Promise<void> =>{
        const sendBody = {
            studentId:studentId,
            courseId:courseId
        }
        
        try {
            await axios.post(enroll, sendBody)
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    removeStudentToCourse = async (id:string):Promise<void> =>{
        try {
            await axios.delete(`${enroll}/${id}`);
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getCourseRelation = async (id:string):Promise<ICourseRelation> =>{
        try {
            const courseRelation = await axios.get(`${enroll}/${id}`);
            return courseRelation.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getCourseRelationIds = async (courseId:string, studentId:string): Promise<ICourseRelation[]> =>{
        const params = {
            courseId:courseId,
            studentId:studentId
        }
        try {
            const relationId = await axios.get(enroll, {
                params:params
            });
            return relationId.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getAllCourseRelations = async ():Promise<ICourseRelation[]> =>{
        try {
            const relation = await axios.get(relations);
            return relation.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }


}
