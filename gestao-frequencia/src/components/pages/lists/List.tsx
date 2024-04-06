import { Col, Divider, Form, Input, Row, Select } from 'antd'
import React, { FormEvent, useEffect, useState } from 'react'
import { listContainerDivStyle, listFormStyle, listHeaderStyle, listMainStyle } from './styles';
import { useAuth } from '../../../hooks/useAuth';
import { CourseRepository } from '../../../repository/CourseRepository';
import { AttendanceList } from '../../../repository/ListRepository';
import { notifyError, notifySuccess } from '../../shared/popMessage/PopMessage';
import { ICourse } from '../../../entities/Course/Course';
import { Button } from '../../shared/button/Button';
import { TableContainer } from '../../shared/tableContainer/TableContainer';
import { ListTable } from './listTable/ListTable';

const listTableQueryKey = 'listTableQueryKey';

export const List:React.FC = () => {

  const courseData = new CourseRepository();
  const listData = new AttendanceList();

  const {schoolName} = useAuth();

  const [courses, setCourses] = useState<ICourse[]>([])

  const [form] = Form.useForm();

  const clearForm = () =>{
      form.resetFields();
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    await listData
      .createAttendanceList(form.getFieldValue('attendanceDate'),form.getFieldValue('courseId'))
      .then(data => {
      console.log('List created:', data);
      notifySuccess("Lista de Chamada Cadastrada");
      clearForm();
    }).catch(error => {
      notifyError("Erro ao cadastrar Lista");
      console.error('Error creating Attendance List:', error);
    });
  };

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

const dividerText = (text:string):string => {
  return text.toUpperCase();
}

useEffect(()=>{
  form.setFieldValue('attendanceDate', form.getFieldValue('attendanceDate'));
  form.setFieldValue('courseId', form.getFieldValue('studentId'));
});

  return (
    <>
      <div style={listContainerDivStyle}>
        <header style={listHeaderStyle}>
          <Divider>{dividerText('criar lista de chamada')}</Divider>
        </header>
        <main style={listMainStyle}>
          <p>Instituição de Ensino</p>
          <p>{schoolName}</p>

          <Form style={listFormStyle} 
            layout='vertical' 
            name='attendanceList' 
            form={form} 
            onFinish={()=>{
              form.getFieldValue('attendanceDate'),
              form.getFieldValue('courseId')
            }}
          >

            <Form.Item
              name='attendanceDate'
              label='Data da Aula'
              rules={[{required:true}]}
              style={{width:'20rem'}}
            >
              <Input
                  name="attendanceDate" 
                  onChange={form.getFieldValue} 
                  placeholder='dd/mm/aaaa'
                />
            </Form.Item>

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
            <span style={{display:'inline-flex'}}>
              <Button text = "Cadastrar" type="submit" click={handleSubmit}/>
              <Button text = "Limpar" type='reset' click={()=>{clearForm();notifySuccess("Formulário limpo")}}/>
            </span>
          </Form>
        </main>

        <TableContainer>
          <ListTable 
            listQueryKey={listTableQueryKey}
            getAllEntities={listData.getAllAttendanceLists}
            deleteEntity={listData.deleteAttendanceList}
          />
        </TableContainer>
      </div>
    </>
  )
}
