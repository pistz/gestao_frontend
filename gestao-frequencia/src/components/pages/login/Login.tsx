import React, { useContext } from "react"
import logo from '../../../assets/home-logo.png'
import { formStyles, loginDivStyle, loginFormStyles, logoStyles } from "./styles";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import AuthContext from "../../context/authenticate";
import {  useNavigate } from "react-router-dom";
import { ILogin } from "./types";
import { notifyError } from "../../shared/popMessage/PopMessage";


export const Login:React.FC = () =>{

    const {signed, setSigned} = useContext(AuthContext);

    const navigate = useNavigate();

    const onFinish = (values:ILogin) => {
        setSigned(true);
        if(signed){
            console.log('Received values of form: ', values);
        }
    };

    return (
    <>
        <div style={loginDivStyle}>
            <div style={logoStyles}>
                <img src={logo} alt="app logo" />
            </div>  
            <br></br>
            <div style={loginFormStyles}>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(e)=> onFinish(e)}
            >
            <Form.Item
                name="username"
                rules={[{ required: true }]}
                style={formStyles}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" type='email'/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true }]}
                style={formStyles}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                style={formStyles}
            >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lembre-me</Checkbox>

            </Form.Item>
                <a className="login-form-forgot" href="">
                Esqueci a senha
                </a>
            </Form.Item>

            <Form.Item style={{display:'flex', flexDirection:"row", alignItems:'center', justifyContent:'center', textAlign:'center'}}>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button" 
                    style={{margin:'0 1rem', height:'2rem', position:'relative'}} 
                    onClick={()=> {signed? navigate('/home/main'): notifyError("Erro de login")}}
                >
                Entrar
                </Button>
                <span style={formStyles}>ou</span> <a href="">fazer cadastro</a>
            </Form.Item>
        </Form>
            </div>
        </div>
    </>
    )
}