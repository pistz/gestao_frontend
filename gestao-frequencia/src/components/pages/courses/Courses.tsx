import React from 'react'
import { courseContainerDivStyle, courseHeaderStyle, courseMainStyle } from './styles'

export const Courses:React.FC = () => {
  return (
    <>
      <div style={courseContainerDivStyle}>
        <header style={courseHeaderStyle}>
          Cadastrar cursos
        </header>
        <main style={courseMainStyle}>

        </main>
      </div>
    </>
  )
}
