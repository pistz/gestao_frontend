import React, { createContext, useState } from 'react';
import { IChildren, TablesContextData } from './types';
import { IStudent } from '../entities/Student/Student';
import { ICourse } from '../entities/Course/Course';
import { ICourseRelation } from '../entities/Course/CourseRelation';
import { IList } from '../entities/List/List';
import { IListRelation } from '../entities/List/ListRelation';


const TableDataContext = createContext<TablesContextData>({} as TablesContextData);

export const TableDataProvider: React.FC<IChildren> = ({ children }:IChildren) => {

    const [studentsTableData, setStudentsTableData] = useState<IStudent[]>([]);

    const [coursesTableData, setCoursesTableData] = useState<ICourse[]>([]);

    const [listsTableData, setListsTableData] = useState<IList[]>([]);

    const [attendanceTableData, setAttendanceTableData] = useState<IListRelation[]>([]);

    const [enrollTableData, setEnrollTableData] = useState<ICourseRelation[]>([]);

    const [courseId, setCourseId] = useState<string>('');

    const [attendanceListId, setAttendanceListId] = useState<string>('');



    return (
    <TableDataContext.Provider value={{ 
            studentsTableData,
            setStudentsTableData,
            coursesTableData,
            setCoursesTableData,
            listsTableData,
            setListsTableData,
            attendanceTableData,
            setAttendanceTableData,
            enrollTableData,
            setEnrollTableData,
            courseId,
            setCourseId,
            attendanceListId,
            setAttendanceListId
    }}>
        {children}
    </TableDataContext.Provider>
    );
};

export default TableDataContext;