import React, { FormEvent, useState } from 'react'
import { studentHeaderStyle, studentContainerDivStyle, studentMainStyle, studentFormStyle, studentInputStyle, studentButtonStyle } from './styles'
import { createStudentDTO } from './types';
import { StudentRepository } from '../../../repository/StudentRepository';
import { notifyError, notifySuccess } from '../../shared/popMessage/PopMessage';

const createStudent = new StudentRepository().createStudent;

export const Students:React.FC = () => {

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

    await createStudent(formData.firstName, formData.lastName, formData.email)
      .then(data => {
      console.log('Student created:', data);
      notifySuccess("Estudante cadastrado");
      setFormData(initialFormData);
    }).catch(error => {
      notifyError("Erro ao cadastrar estudante");
      console.error('Error creating student:', error);
    });
  };

  
  return (
    <>
      <div style={studentContainerDivStyle}>
        <header style={studentHeaderStyle}>
          Cadastrar alunos
        </header>
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

                  <button type="submit" style={studentButtonStyle}>Cadastrar</button>

              </form>

        </main>
      </div>
    </>
  )
}
