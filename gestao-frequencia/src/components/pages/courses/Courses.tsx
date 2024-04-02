import React, { FormEvent, useState } from 'react'
import { courseContainerDivStyle, courseFormStyle, courseHeaderStyle, courseMainStyle, coursetInputStyle } from './styles'
import { Button } from '../../shared/button/Button'
import { createCourseDTO } from './types';
import { CourseRepository } from '../../../repository/CourseRepository';
import { notifyError, notifySuccess } from '../../shared/popMessage/PopMessage';
import { useAuth } from '../../../hooks/useAuth';
import { Divider } from 'antd';

const createCourse = new CourseRepository().createCourse;

export const Courses:React.FC = () => {

  const {userSchoolId, schoolName} = useAuth();

  const dividerText = (text:string):string => {
    return text.toUpperCase();
  }

  const initialFormData:createCourseDTO = {
    name:'',
    startingYear: new Date().getFullYear(),
    schoolId:userSchoolId
  };

  const [formData, setFormData] = useState<createCourseDTO>(initialFormData);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    await createCourse(formData.name, formData.startingYear, formData.schoolId)
      .then(data => {
      console.log('Course created:', data);
      notifySuccess("matéria cadastrada");
      setFormData(initialFormData);
    }).catch(error => {
      notifyError("Erro ao cadastrar matéria");
      console.error('Error creating course:', error);
    });
  };

  return (
    <>
      <div style={courseContainerDivStyle}>
        <header style={courseHeaderStyle}>
          Cadastrar Matérias
        </header>
        <main style={courseMainStyle}>
          <p>Instituição de Ensino</p>
          <p>{schoolName}</p>
        <form onSubmit={handleSubmit} style={courseFormStyle}>

          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            style={coursetInputStyle}
            placeholder='Nome da Matéria'
          />
          <label>Ano de início da matéria</label>
          <input 
            type="number" 
            name="startingYear" 
            value={formData.startingYear} 
            onChange={handleChange} 
            style={coursetInputStyle}
            placeholder='Ano de inicio'
          />
        <span style={{display:'inline-flex'}}>
          <Button text = "Cadastrar" type="submit" />
          <Button text = "Limpar" type='reset' click={()=>{setFormData(initialFormData); notifySuccess("Formulário apagado")}}/>
        </span>

        </form>
        <Divider>{dividerText('listagem de matérias cadastradas')}</Divider>


        {/* //TODO inserir listagem dinâmica das matérias cadastradas 
            // cada matéria deve abrir uma listagem dos alunos cadastrados para consulta
        */}

        </main>
      </div>
    </>
  )
}
