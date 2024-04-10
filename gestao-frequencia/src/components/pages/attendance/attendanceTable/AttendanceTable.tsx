import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { StudentRepository } from '../../../../repository/StudentRepository';
import { useTableData } from '../../../../hooks/useTableData';
import { AttendanceList } from '../../../../repository/ListRepository';
import { IStudent } from '../../../../entities/Student/Student';
import { notifyError, notifySuccess } from '../../../shared/popMessage/PopMessage';

interface Props{
    listId: string;
    idCourse: string;
}

const studentData = new StudentRepository();
const listData = new AttendanceList();

const AttendanceTable: React.FC<Props> = ({ listId, idCourse }) => {

    const [disabledButtons, setDisabledButtons] = useState<string[]>([]);

    const {
        studentsTableData, 
        setStudentsTableData, 
        attendanceListId, 
        setAttendanceListId, 
        courseId, 
        setCourseId
    } = useTableData();

    setCourseId(idCourse);
    setAttendanceListId(listId);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
            const students = await studentData.getAllStudents();
            const studentsWithCourse = students.filter((student) =>
                student.courses.some((course) => course.courseId === courseId)
            );
            setStudentsTableData(studentsWithCourse);
            } catch (error) {
            console.error('Error fetching students:', error);
            }
        };

        fetchStudents(); 
        }, [setStudentsTableData, courseId]); 

    const attendToClass = async (studentId: string, attendanceListId:string):Promise<void> => {
            try {
                await listData.attendToClass(studentId, attendanceListId);
                setDisabledButtons((prevButtons) => [...prevButtons, studentId]);
                notifySuccess("Presença registrada!")
            } catch (error) {
                notifyError("Aluno já possui presença registrada")
            }
    };

    const columns = [
        {
        title: 'Nome',
        dataIndex: 'firstName',
        key: 'firstName',
        },
        {
        title: 'Sobrenome',
        dataIndex: 'lastName',
        key: 'lastName',
        },
        {
        title: 'Chamada',
        key: 'attend',
        render: (_:IStudent, student: IStudent) => (
            <Button 
                key={student.id} 
                disabled={disabledButtons.includes(student.id)}  
                onClick={() => attendToClass(student.id, attendanceListId)}
                >
                    {disabledButtons.includes(student.id)? "Presente!":"Ausente"}
            </Button>
        ),
        },
    ];

    return (
        <Table dataSource={studentsTableData} columns={columns} pagination={false} />
    );
};

export default AttendanceTable;
