import React, { useEffect} from "react"
import logo from '../../../assets/home-logo.png'
import { buttonsFormStyles, buttonStyles, formStyles, imgStyles, loginDivStyle, loginFormStyles, logoStyles } from "./styles";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { ILogin } from "./types";
import { notifyError } from "../../shared/popMessage/PopMessage";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LoginRepository } from "../../../repository/LoginRepository";

const validateLogin = new LoginRepository();

export const Login:React.FC = () =>{

    const {setSigned, setUserEmail, setUserPassword} = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values:ILogin) => {
        //TODO - fazer lógica de login correta
        await validateLogin.validateUser(values)
        .then((e)=>{
            e !== true? notifyError("Erro de login, usuário ou senha incorretos"):
            setUserEmail(values.username);
            setUserPassword(values.password);
            setSigned(true);
            localStorage.setItem('user', values.username);
            localStorage.setItem('pass', values.password);
        })
    };

    useEffect(()=>{
        const findUser = localStorage.getItem('user');
        const findPass = localStorage.getItem('pass');
        if(findUser && findPass){
            const userData = {username:findUser, password:findPass};
            const handleLogin = async ()=>{
                const user = await validateLogin.validateUser(userData);
                if(user){
                    setUserEmail(findUser);
                    setUserPassword(findPass);
                    setSigned(true);
                    navigate('/home/main');
                }
            }
            handleLogin();
        }
        if(!localStorage)
        navigate('/login');
    });

    return (
    <>
        <div style={loginDivStyle}>
            <div style={logoStyles}>
                <img style={imgStyles}src={logo} alt="app logo" />
            </div>  
            <br></br>
            <div style={loginFormStyles}>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(e) => onFinish(e)}
            >
            <Form.Item
                name="username"
                rules={[{ required: true , message:'Insira o e-mail do usuário'}]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="E-mail" 
                type='email'
                style={formStyles}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true , message:"Insira a senha do usuário"}]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={formStyles}
                />
            </Form.Item>
            <Form.Item
                style={formStyles}
            >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lembre-me</Checkbox>

            </Form.Item>

            </Form.Item>

            <Form.Item style={buttonsFormStyles}>
                <Button 
                    block
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button" 
                    style={buttonStyles}
                >
                Entrar
                </Button>
            </Form.Item>
        </Form>
            </div>
        </div>
    </>
    )
}