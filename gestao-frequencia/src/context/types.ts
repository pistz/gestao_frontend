import { Dispatch, SetStateAction } from "react";
import { IStudent } from "../entities/Student/Student";
import { ICourse } from "../entities/Course/Course";
import { IList } from "../entities/List/List";
import { IListRelation } from "../entities/List/ListRelation";
import { ICourseRelation } from "../entities/Course/CourseRelation";

export interface IChildren {
    children: React.ReactNode;
}

export interface AuthContextData {
    signed:boolean;
    userEmail:string;
    userRole:string;
    userPassword:string;
    userSchoolId:string;
    schoolName:string;


    setUserEmail:Dispatch<SetStateAction<string>>;
    setSigned: Dispatch<SetStateAction<boolean>>;
    setUserRole:Dispatch<SetStateAction<string>>;
    setUserPassword:Dispatch<SetStateAction<string>>;
    setUserSchoolId:Dispatch<SetStateAction<string>>;
    setSchoolname:Dispatch<SetStateAction<string>>;
}

export interface TablesContextData {
    studentsTableData:IStudent[],
    coursesTableData:ICourse[],
    listsTableData:IList[],
    attendanceTableData:IListRelation[],
    enrollTableData:ICourseRelation[],
    courseId:string,
    attendanceListId:string


    setStudentsTableData:Dispatch<SetStateAction<IStudent[]>>;
    setCoursesTableData:Dispatch<SetStateAction<ICourse[]>>;
    setListsTableData:Dispatch<SetStateAction<IList[]>>;
    setAttendanceTableData:Dispatch<SetStateAction<IListRelation[]>>;
    setEnrollTableData:Dispatch<SetStateAction<ICourseRelation[]>>;
    setCourseId:Dispatch<SetStateAction<string>>;
    setAttendanceListId:Dispatch<SetStateAction<string>>;
}