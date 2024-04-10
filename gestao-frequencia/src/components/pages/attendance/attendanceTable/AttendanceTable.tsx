import React, { useEffect } from 'react';
import { StudentRepository } from '../../../../repository/StudentRepository';
import { useTableData } from '../../../../hooks/useTableData';
import { AttendanceList } from '../../../../repository/ListRepository';

interface Props{
    listId: string;
    idCourse: string;
}

const studentData = new StudentRepository();
const listData = new AttendanceList();

const AttendanceTable: React.FC<Props> = ({ listId, idCourse }) => {

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

    //TODO fix bug
    const fetchStudents = async () => {
        try {
        const students = await studentData.getAllStudents();
        const relations = await studentData.getAllCourseRelations();

        const courseFilter = relations.filter((course)=>{
            course.courseId === courseId ? course.id : null
        });

        setStudentsTableData(students);
        console.log(courseFilter, relations, courseId)
        } catch (error) {
        console.error('Error fetching students:', error);
        }
    };


  useEffect(() => {
    fetchStudents();
  },[]);


  const attendToClass = async (studentId: string, attendanceListId:string):Promise<void> => {
        await listData.attendToClass(studentId, attendanceListId)
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Chamada</th>
        </tr>
      </thead>
      <tbody>
        {studentsTableData.map((student) => (
          <tr key={student.id}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>
              <button onClick={() => attendToClass(student.id,attendanceListId)}>Presente!</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
