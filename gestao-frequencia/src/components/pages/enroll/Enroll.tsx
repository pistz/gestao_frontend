import React, { FormEvent, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Drawer, Form, Row, Select, Space } from 'antd';
import { StudentRepository } from '../../../repository/StudentRepository';
import { CourseRepository } from '../../../repository/CourseRepository';
import { IStudent } from '../../../entities/Student/Student';
import { ICourse } from '../../../entities/Course/Course';
import { notifyError, notifySuccess } from '../../shared/popMessage/PopMessage';
import { Button as Btn} from '../../shared/button/Button';
import { EnrollTable } from './enrollTable/EnrollTable';
import { TableContainer } from '../../shared/tableContainer/TableContainer';
import { enrollHeaderStyle } from './styles';

const studentData = new StudentRepository();
const courseData = new CourseRepository();
const courseRelationQueryKey = 'courseRelationQueryKey'

export const Enroll: React.FC = () => {

    const [form] = Form.useForm();

    const clearForm = () =>{
        form.resetFields();
    }


    const [open, setOpen] = useState(false);

    const [students, setStudents] = useState<IStudent[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([])


    const dividerText = (text:string):string => {
        return text.toUpperCase();
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
    
        await studentData.enrollStudent(form.getFieldValue('studentId'), form.getFieldValue('courseId'))
            .then((e) => {
            console.log(e)
            notifySuccess("Estudante matriculado");
            setOpen(false)
            clearForm();
        }).catch(error => {
            setOpen(false)
            notifyError("Erro ao matricular estudante");
            clearForm();
            console.error('Error enrolling student:', error);
        });
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        clearForm();
        setOpen(false);
    };

    useEffect(()=>{
        const loadStudents = async () =>{
            const result = await studentData.getAllStudents();
            return setStudents(result);
        }
        loadStudents();
    },[setStudents]);

    const studentOptions = [...students].map((e) => ({
        value:e.id,
        label:`${e.firstName} ${e.lastName}`
    }));

    useEffect(()=>{
        const loadCourses = async () =>{
            const result = await courseData.getAllCourses();
            return setCourses(result);
        }
        loadCourses();
    },[setCourses]);

    const courseOptions = [...courses].map((e) => ({
        value:e.id,
        label:`${e.name}`
    }));


    useEffect(()=>{
        form.setFieldValue('studentId', form.getFieldValue('studentId'));
        form.setFieldValue('courseId', form.getFieldValue('studentId'));
    });

    return (
        <>
        <header style={enrollHeaderStyle}>
        <Divider style={{margin:'2rem auto'}}>{dividerText('realizar matrículas')}</Divider>
        </header>
        <span style={{display:'flex', alignItems:'center', justifyContent:"center"}}>
            <Button 
                type="primary" 
                onClick={showDrawer} 
                icon={<PlusOutlined />}
                style={{margin:'1rem auto'}}
            >
                Matricular Aluno
            </Button>
        </span>
        <Drawer
            title="Realizar Matrícula em curso"
            width={800}
            onClose={onClose}
            open={open}
            styles={{
            body: {
                paddingBottom: 80,
            },
            }}
        >
            <Form layout="vertical" name='enroll' form={form} onFinish={()=>{form.getFieldValue('studentId'), form.getFieldValue('courseId')}}>
            <Row gutter={[4,4]}>
                <Col span={100}>
                <Form.Item
                    name="studentId"
                    label="Aluno"
                    rules={[{ required: true, message: 'Selecione um aluno' }]}
                >
                    <Select 
                        placeholder="Selecione um aluno" 
                        style={{width:'20rem'}}
                        options={studentOptions}
                    />

                </Form.Item>
                </Col>
            </Row>
            <Row gutter={[4,4]}>
                <Col span={100}>
                <Form.Item
                    name="courseId"
                    label="Matéria"
                    rules={[{ required: true, message: 'Selecione uma matéria' }]}
                >
                    <Select 
                        placeholder="Selecione uma matéria" 
                        style={{width:'20rem'}}
                        options={courseOptions}
                        onChange={form.setFieldValue}
                    />
                </Form.Item>
                </Col>
            </Row>
                <Space>
                    <Btn type='submit' text='realizar matrícula' click={handleSubmit}/>
                </Space>
            </Form>
        </Drawer>

        <Divider>{dividerText('matrículas efetivadas')}</Divider>
            <TableContainer>
                <EnrollTable 
                    listQueryKey={courseRelationQueryKey}
                    getAllEntities={studentData.getAllCourseRelations}
                    deleteEntity={studentData.removeStudentToCourse}
                />
            </TableContainer>

        </>
    );
};