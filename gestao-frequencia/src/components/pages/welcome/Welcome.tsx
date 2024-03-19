import React from 'react'
import welcome from '../../../assets/home-logo.png'
import { imgStyle, innerDivStyle, mainDivStyle } from './styles.ts'

export const Welcome:React.FC = () =>{

    return (
        <>
        <div style={mainDivStyle}>
            <div style={innerDivStyle}>
                <img style={imgStyle} src={welcome} alt="welcome"/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
        </>
    )
}