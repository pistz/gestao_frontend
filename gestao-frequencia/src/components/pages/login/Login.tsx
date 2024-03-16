import React from "react"
import { useNavigate } from "react-router-dom"
import logo from '../../../assets/home-logo.png'
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons";
export const Login:React.FC = () =>{

    const navigate = useNavigate();

    const handleLogin = () =>{
        navigate('/home/home')
    }
    return (
        <>
        <div style={{display:'flex', flexDirection:'column', border:'solid 0.2rem #020d4e', margin:'1rem 1rem', borderRadius:'3.3rem 3.3rem'}}>
            <div style={{display:'flex', flexDirection:'column'}}>

                <Input 
                    type="text" 
                    placeholder="E-mail para login"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                />
                <br></br>
                <Input.Password
                    placeholder="Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </div>
            <div>
            <Button size={'large'} value={'entrar'} onClick={handleLogin}>Entrar</Button>
            </div>
            <img src={logo} alt="app logo" />
        </div>   
        </>
    )
}