import React from "react"
import { useNavigate } from "react-router-dom"
export const Login:React.FC = () =>{

    const navigate = useNavigate();

    const handleLogin = () =>{
        navigate('/home')
    }
    return (
        <>
            <div>
                <label>Login</label>
                <input type="text" />

                <label htmlFor="">Senha</label>
                <input type="password" />
            </div>
            <div>
                <input type="button" value="entrar" onClick={handleLogin}/>
            </div>
        </>
    )
}