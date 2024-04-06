import axios from "axios";
import { endpoints } from "../routes/endpoints";
import Repository from "./base/Repository";
import { IList } from "../entities/List/List";
import { IListRelation } from "../entities/List/ListRelation";

const list:string = endpoints.host.concat(endpoints.api,endpoints.lists);
const attend:string = endpoints.host.concat(endpoints.api, endpoints.attend);
const listRelation:string = endpoints.host.concat(endpoints.api, endpoints.listRelation);
export class AttendanceList extends Repository{

    createAttendanceList = async (attendanceDate:string, courseId:string) =>{

        const sendBody = {
            attendanceDate:attendanceDate,
            courseId:courseId
        };

        try {
            const createdList = await axios.post(list, sendBody);
            return createdList.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    deleteAttendanceList = async (id:string):Promise<void> => {
        try {
            await axios.delete(`${list}/${id}`);
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    

    getAllAttendanceLists = async ():Promise<IList[]> =>{
        try {
            const attendanceLists = await axios.get(list);
            return attendanceLists.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    attendToClass = async (studentId:string, attendanceListId:string):Promise<void> =>{
        const sendBody = {
            studentId:studentId,
            attendanceListId:attendanceListId
        }
        try {
            await axios.post(attend, sendBody);
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }

    getAllListRelations = async ():Promise<IListRelation[]> =>{
        try {
            const listRelations = await axios.get(listRelation);
            return listRelations.data;
        } catch (error) {
            Repository.checkError(error)
            throw Error("error: " + error);
        }
    }
}