import React, { FormEvent, useState } from 'react'
import { courseContainerDivStyle, courseFormStyle, courseHeaderStyle, courseMainStyle, coursetInputStyle } from './styles'
import { Button } from '../../shared/button/Button'
import { createCourseDTO } from './types';
import { CourseRepository } from '../../../repository/CourseRepository';
import { notifyError, notifySuccess } from '../../shared/popMessage/PopMessage';

const createCourse = new CourseRepository().createCourse;

export const Courses:React.FC = () => {

  const initialFormData:createCourseDTO = {
    name:'',
    startingYear:2000,
    schoolId:''
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
      notifySuccess("Curso cadastrado");
      setFormData(initialFormData);
    }).catch(error => {
      notifyError("Erro ao cadastrar curso");
      console.error('Error creating course:', error);
    });
  };




  return (
    <>
      <div style={courseContainerDivStyle}>
        <header style={courseHeaderStyle}>
          Cadastrar cursos
        </header>
        <main style={courseMainStyle}>
        <form onSubmit={handleSubmit} style={courseFormStyle}>

          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            style={coursetInputStyle}
            placeholder='Nome do Curso'
          />

          <input 
            type="number" 
            name="startingYear" 
            value={formData.startingYear} 
            onChange={handleChange} 
            style={coursetInputStyle}
            placeholder='Ano de inicio do curso'
          />

          <Button text = "Cadastrar"/>

</form>

        </main>
      </div>
    </>
  )
}
