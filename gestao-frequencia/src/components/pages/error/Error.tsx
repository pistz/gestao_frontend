import React from "react";
import error from '../../../assets/page-not-found.png'
import { errorImgStyle, errorInnerDivStyle, errorMainDivStyle, errorTextStyle } from "./styles";

export const ErrorPage:React.FC = () =>{

    return (
        <>
        <div style={errorMainDivStyle}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p style={errorTextStyle}>Oops, parece que algo deu errado!</p>
            <br></br>
            <br></br>
            <br></br>
            <div style={errorInnerDivStyle}>
                <img style={errorImgStyle} src={error} alt="Page not found"/>
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