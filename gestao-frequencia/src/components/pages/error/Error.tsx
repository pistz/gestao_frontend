import React from "react";
import error from '../../../assets/page-not-found.png'
import './styles.css'

export const ErrorPage:React.FC = () =>{

    return (
        <>
        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'0 auto'}}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p style={{fontSize:'2rem', fontWeight:'bold', alignSelf:'center', justifySelf:'center', textAlign:'center', margin:'0.5rem'}}>Oops, parece que algo deu errado!</p>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <img src={error} alt="Page not found"/>
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