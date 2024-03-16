import React from "react"
import { useNavigate } from "react-router-dom"
import logo from '../../../assets/app-logo.jpeg'
export const Login:React.FC = () =>{

    const navigate = useNavigate();

    const handleLogin = () =>{
        navigate('/home')
    }
    return (
        <>
        <div style={{display:'flex', flexDirection:'column'}}>
            <div>
                <label>Login</label>
                <input type="text" />

                <label htmlFor="">Senha</label>
                <input type="password" />
            </div>
            <div>
                <input type="button" value="entrar" onClick={handleLogin}/>
            </div>
            <img src={logo} alt="app logo" />
        </div>   
        </>
    )
}