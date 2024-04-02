import React, { FormEvent, useState } from 'react'
import { studentHeaderStyle, studentContainerDivStyle, studentMainStyle, studentFormStyle, studentInputStyle } from './styles'
import { createStudentDTO } from './types';
import { StudentRepository } from '../../../repository/StudentRepository';
import { notifyError, notifySuccess } from '../../shared/popMessage/PopMessage';
import { Button } from '../../shared/button/Button';
import { useAuth } from '../../../hooks/useAuth';
import { Divider, TableColumnsType } from 'antd';
import { DynamicTable } from '../../shared/table/Table';
import { IStudent } from '../../../entities/Student/Student';

const studentQueryKey = 'studentQueryKey';

const columns:TableColumnsType<IStudent> = [
  {
    title:'Número de Registro',
    dataIndex:'id',
    key:'id'
  },
  {
    title:'Nome',
    dataIndex:'firstName',
    key:'firstName',
  },
  {
    title:'Sobrenome',
    dataIndex:'lastName',
    key:'lastName',
  },
  {
    title:'E-mail',
    dataIndex:'email',
    key:'email'
  }
]

export const Students:React.FC = () => {

  const studentData = new StudentRepository();


  const {schoolName} = useAuth();

  const initialFormData:createStudentDTO = {
    firstName:'',
    lastName:'',
    email:''
  };

  const [formData, setFormData] = useState<createStudentDTO>(initialFormData);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    await studentData.createStudent(formData.firstName, formData.lastName, formData.email)
      .then(data => {
      console.log('Student created:', data);
      notifySuccess("Estudante cadastrado");
      setFormData(initialFormData);
    }).catch(error => {
      notifyError("Erro ao cadastrar estudante");
      console.error('Error creating student:', error);
    });
  };

  
  const dividerText = (text:string):string => {
    return text.toUpperCase();
  }

  return (
    <>
      <div style={studentContainerDivStyle}>
        <header style={studentHeaderStyle}>
          Cadastrar alunos
        </header>
        <p>Instituição de Ensino</p>
        <p>{schoolName}</p>
        <main style={studentMainStyle}>

          <form onSubmit={handleSubmit} style={studentFormStyle}>

              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                style={studentInputStyle}
                placeholder='Nome do Aluno'
              />

              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                style={studentInputStyle}
                placeholder='Sobrenome do Aluno'
              />

              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                style={studentInputStyle}
                placeholder='E-mail do aluno'
              />
            <span style={{display:'inline-flex'}}>
              <Button text = "Cadastrar" type='submit' />
              <Button text = "Limpar" type='reset' click={()=>{setFormData(initialFormData); notifySuccess("Formulário apagado")}}/>
            </span>
          </form>

          <Divider>{dividerText('Alunos matriculados')}</Divider>

          <DynamicTable 
            columns={columns}
            listQueryKey={studentQueryKey} 
            getAllEntities={studentData.getAllStudents} 
            deleteEntity={studentData.deleteStudent}
            type='IStudent'
          />

        </main>
      </div>
    </>
  )
}
