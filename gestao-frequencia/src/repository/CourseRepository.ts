import axios from "axios";
import Repository from "./base/Repository";
import { endpoints } from "../routes/endpoints";
import { ICourse } from "../entities/Course/Course";

const course:string = endpoints.host+endpoints.api+endpoints.course;

export class CourseRepository extends Repository{

    createCourse = async (name:string, startingYear:number, schoolId:string) =>{

        const sendBody = {
            name:name,
            startingYear:startingYear,
            schoolId:schoolId
        };

        try {
            const created = await axios.post(course, sendBody);
            return created.data
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getCourse = async (id:string) =>{
        try {
            const courseResult = await axios.get(`${course}/${id}`);
            return courseResult;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getAllCourses = async ():Promise<ICourse[]> => {
        try {
            const allCourses = await axios.get(course);
            return allCourses.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    deleteCourse = async (id:string) =>{
        try {
            await axios.delete(`${course}/${id}`);
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }


}