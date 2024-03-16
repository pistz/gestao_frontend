import React from 'react'
import welcome from '../../../assets/home-logo.png'
import './styles.css'

export const Welcome:React.FC = () =>{

    return (
        <>
        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'0 auto'}}>
            <div>
                <img src={welcome} alt="welcome"/>
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