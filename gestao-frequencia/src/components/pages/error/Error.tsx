import React from "react";
import error from '../../../assets/page-not-found.png'
import './styles.css'

export const ErrorPage:React.FC = () =>{

    return (
        <>
            <div>
                <img src={error} alt="Page not found"/>
            </div>
        </>
    )
}