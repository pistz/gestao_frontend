import { Divider, Drawer, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { listContainerDivStyle } from '../lists/styles';
import { attendanceHeaderStyle, attendanceMainStyle } from './styles';
import { CourseRepository } from '../../../repository/CourseRepository';
import { AttendanceList } from '../../../repository/ListRepository';
import { useTableData } from '../../../hooks/useTableData';
import { Button } from '../../shared/button/Button';
import AttendanceTable from './attendanceTable/AttendanceTable';

const courseData = new CourseRepository(); 
const listData = new AttendanceList();

export const Attendance:React.FC = () => {

    const [courseOptions, setCourseOptions] = useState<{value:string, label:string}[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);
    
    const {listsTableData, setListsTableData, courseId, setCourseId, attendanceListId, setAttendanceListId} = useTableData();

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<string>('');


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const dividerText = (text:string):string => {
        return text.toUpperCase();
    };

    useEffect(() =>{
        const fetchCourseData = async () =>{
            try {
                const courses = await courseData.getAllCourses();
                const options = courses.map(course => ({
                    value:course.id,
                    label:course.name
                }));
                setCourseOptions(options);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourseData();
    },[]);

    const handleCourseChange = async (value: string) => {
        setSelectedCourse(value);
        const lists = listData.getAllAttendanceLists();
        const filteredList = (await lists).filter((list) => list.courseId === value);
        setListsTableData(filteredList)
    };

    const isValidDate = (dateString: string): boolean => {
        const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    
        if (!dateString.match(dateFormat)) {
            return false;
        }
    
        const parts = dateString.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
    
        const inputDate = new Date(year, month, day);
    
        if (
            isNaN(inputDate.getTime()) ||
            inputDate.getDate() !== day ||
            inputDate.getMonth() !== month ||
            inputDate.getFullYear() !== year
        ) {
            return false;
        }

        const currentDate = new Date();

        return (
            inputDate.getFullYear() === currentDate.getFullYear() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getDate() === currentDate.getDate()
        );

    };


    return (
        <>
        <div style={listContainerDivStyle}>
                <header style={attendanceHeaderStyle}>
                <Divider>{dividerText('chamada')}</Divider>
                </header>
                <section style={attendanceMainStyle}>
                    <p style={{marginBottom:'0.5rem'}}>Matéria</p>
                    <Select
                        showSearch
                        style={{ width: '15rem' }}
                        placeholder="Selecione a matéria"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={courseOptions}
                        onChange={handleCourseChange}
                    />
                </section>
        </div>
        <Divider>{dividerText('chamadas disponíveis')}</Divider>
        <div style={attendanceMainStyle}>
            {selectedCourse && listsTableData.map((list, index) => {
                if (isValidDate(list.attendanceDate)) {
                    return (
                        <Button 
                            key={index} 
                            text={list.attendanceDate} 
                            type='button' 
                            click={showDrawer} 
                            textTransform={()=>{
                                setDate(list.attendanceDate);
                                setCourseId(list.courseId);
                                setAttendanceListId(list.id);}
                            }
                        />
                        
                    );
                }
                return null;
            })}
        </div>

        <Drawer title={date} onClose={onClose} open={open} size='large'>
            <AttendanceTable 
                idCourse={courseId}
                listId={attendanceListId}
            />
        </Drawer>

        
        </>

    )
}
