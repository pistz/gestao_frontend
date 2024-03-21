import React from 'react'
import welcome from '../../../assets/home-logo.png'
import { helloTextStyle, imgStyle, innerDivStyle, mainDivStyle } from './styles.ts'
import { useAuth } from '../../../hooks/useAuth.ts'

export const Welcome:React.FC = () =>{

    const {userEmail} = useAuth();

    return (
        <>
        <div style={mainDivStyle}>
            <div style={innerDivStyle}>
                <p style={helloTextStyle}>Logado como: {userEmail}</p>
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